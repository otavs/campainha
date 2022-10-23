import { IUser } from '../schemas/user'
import { Event as Event_ } from '@netlify/functions/dist/function/event'
import { HandlerResponse } from '@netlify/functions'

export type Event = Event_ & { user?: IUser }

export function res(statusCode: number, body?: any): HandlerResponse {
  body = JSON.stringify(body)
  return {
    statusCode,
    body,
    headers: {
      'Content-Type': 'application/json'
    }
  }
}

export function errorRes(statusCode: number, msg?: string, err?: any) {
  return res(statusCode, { msg, err })
}

export function parseToken(token?: string): string | undefined {
  return token?.replace('Bearer ', '')
}
