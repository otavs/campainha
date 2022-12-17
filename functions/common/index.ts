import { IUser, User } from '../schemas/user'
import { Event as Event_ } from '@netlify/functions/dist/function/event'
import { HandlerResponse } from '@netlify/functions'
import { connect } from '../db'
import { Config } from '../schemas/config'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

export type Event = Event_ & { user?: IUser }

export async function handleRequest(ev: Event, ctx, routes) {
  const path = ev.path.replace('/.netlify/functions', '')

  const route = routes[ev.httpMethod]?.[path]
  if (!route) return errorRes(404, 'route not found')

  const err = await connect()
  if (err) {
    return err
  }

  const [handlerFunc, allowedRoles] = route

  if (allowedRoles.includes('all')) return handlerFunc(ev)

  const token = parseToken(ev.headers['authorization'])
  if (!token) return errorRes(401, 'missing token')

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as jwt.JwtPayload
    ev.user = (await User.findById(decoded.id)) as IUser
  } catch (err) {
    console.log(err)
    return errorRes(500, err)
  }

  if (!allowedRoles.includes(ev.user.role))
    return errorRes(401, 'user role not allowed')

  return handlerFunc(ev)
}

export function res(statusCode: number, body?: any): HandlerResponse {
  body = JSON.stringify(body)
  return {
    statusCode,
    body,
    headers: {
      'Content-Type': 'application/json',
    },
  }
}

export function errorRes(statusCode: number, msg?: string, err?: any) {
  return res(statusCode, { msg, err })
}

export function parseToken(token?: string): string | undefined {
  return token?.replace('Bearer ', '')
}
