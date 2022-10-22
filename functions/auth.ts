import { Handler } from '@netlify/functions'
import { connect } from './db'
import { User } from './schemas/user'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { res, errorRes } from './common'

const handler: Handler = async (ev, ctx) => {
  if (!ev.body) return errorRes(400, 'missing body from request')

  const body = JSON.parse(ev.body) as any
  if (typeof body != 'object')
    return errorRes(400, 'body must be a JSON object')

  const { email, password } = body
  if (!email) return errorRes(400, 'email is required')
  if (!password) return errorRes(400, 'password is required')

  const err = await connect()
  if (err) {
    return err
  }

  const user = await User.findOne({ email: email.toLowerCase() })
  if (!user) return errorRes(404, 'user not found', { email })

  const isValid = await bcrypt.compare(password, user.password!)
  if (!isValid) return errorRes(401, 'invalid password')

  const token = jwt.sign(
    { id: user.id, name: user.name, role: user.role },
    process.env.JWT_SECRET,
    {
      expiresIn: '2h',
    }
  )

  user.password = undefined

  return res(200, { token, user })
}

export { handler }
