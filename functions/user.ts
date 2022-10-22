import { Handler } from '@netlify/functions'
import { connect } from './db'
import { res, errorRes, parseToken } from './common'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { User, IUser } from './schemas/user'
import { Event } from './common'
import mongoose from 'mongoose'

const routes = {
  GET: {
    '/user': [getUserById, ['all']],
    '/user/all': [getAllUsers, ['all']],
  },
  POST: {
    '/user': [createUser, ['root']],
  },
  DELETE: {
    '/user': [deleteUser, ['root']],
  },
  PUT: {
    '/user': [updateUser, ['root', 'user']],
  },
}

const handler: Handler = async (ev: Event, ctx) => {
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
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    ev.user = (await User.findById(decoded.id)) as IUser
  } catch (err) {
    console.log(err)
    return errorRes(500, err)
  }

  if (!allowedRoles.includes(ev.user.role))
    return errorRes(401, 'user role not allowed')

  return handlerFunc(ev)
}

async function getUserById(ev: Event) {
  const id = ev.queryStringParameters?.id
  if (!id) return errorRes(400, 'id is required')
  if (!mongoose.isValidObjectId(id)) return errorRes(400, 'invalid id')

  try {
    const user = await User.findById(new mongoose.Types.ObjectId(id)).select(
      '-password -__v'
    )
    if (!user) return errorRes(404, 'user not found')
    return res(200, user)
  } catch (err) {
    console.log(err)
    return errorRes(500, 'error getting user from db', err)
  }
}

async function getAllUsers() {
  try {
    const users = await User.find({ role: 'user' }).select('-password -__v')
    return res(200, users)
  } catch (err) {
    console.log(err)
    return errorRes(500, 'error getting users from db', err)
  }
}

async function createUser(ev: Event) {
  if (!ev.body) return errorRes(400, 'missing body from request')

  const body = JSON.parse(ev.body) as any
  if (typeof body != 'object')
    return errorRes(400, 'body must be a JSON object')

  // if (!body.email) return errorRes(400, 'email is required')
  // if (!body.name) return errorRes(400, 'name is required')
  // if (!body.password) return errorRes(400, 'password is required')

  const user = new User({
    email: body.email?.toLowerCase(),
    name: body.name,
    phone: body.phone,
    role: 'user',
    password: body.password ? await bcrypt.hash(body.password, 10) : undefined,
    address: body.address,
    description: body.description,
    enabled: body.enabled,
  })

  // const userExists = await User.findOne({ email: user.email })
  // if (userExists) return errorRes(400, 'email already exists')

  try {
    await user.save()
  } catch (err) {
    console.log(err)
    return errorRes(500, 'error creating user', err)
  }

  user.password = undefined

  return res(200, user)
}

async function deleteUser(ev: Event) {
  const id = ev.queryStringParameters?.id
  if (!id) return errorRes(400, 'id is required')
  if (!mongoose.isValidObjectId(id)) return errorRes(400, 'invalid id')

  try {
    const { deletedCount } = await User.deleteOne({
      _id: new mongoose.Types.ObjectId(id),
    })
    if (deletedCount == 0) return res(200, 'user not found')
    return res(200)
  } catch (err) {
    console.log(err)
    return errorRes(500, 'error deleting user', err)
  }
}

async function updateUser(ev: Event) {
  if (!ev.body) return errorRes(400, 'missing body from request')

  const body = JSON.parse(ev.body) as any
  if (typeof body != 'object')
    return errorRes(400, 'body must be a JSON object')

  const id = body._id as string
  if (!id) return errorRes(400, 'id is required')
  if (!mongoose.isValidObjectId(id)) return errorRes(400, 'invalid id')

  if (ev.user?.role == 'user' && id != ev.user._id)
    return errorRes(401, 'not allowed to update other user')

  body.email = body.email?.toLowerCase()

  try {
    await User.findOneAndUpdate({ _id: new mongoose.Types.ObjectId(id)}, body)
    return res(200)
  } catch (err) {
    console.log(err)
    return errorRes(500, 'error deleting user', err)
  }
}

export { handler }
