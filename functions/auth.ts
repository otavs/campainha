import { Handler } from '@netlify/functions'
import { connect } from './db'
import { User } from './schemas/user'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { res, errorRes } from './common'
import { Event } from './common'
import nodemailer from 'nodemailer'

const routes = {
  POST: {
    '/auth/login': login,
    '/auth/forgotPassword': forgotPassword,
  },
}

const handler: Handler = async (ev, ctx) => {
  const path = ev.path.replace('/.netlify/functions', '')

  const handler = routes[ev.httpMethod]?.[path]
  if (!handler) return errorRes(404, 'route not found')

  if (!ev.body) return errorRes(400, 'missing body from request')

  const body = JSON.parse(ev.body) as any
  if (typeof body != 'object')
    return errorRes(400, 'body must be a JSON object')

  const err = await connect()
  if (err) {
    return err
  }

  return handler(ev, body)
}

async function login(ev: Event, body) {
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
    process.env.JWT_SECRET!,
    {
      expiresIn: '2h',
    }
  )

  user.password = undefined

  return res(200, { token, user })
}

async function forgotPassword(ev: Event, body) {
  const { email } = body
  if (!email) return errorRes(400, 'email is required')

  const err = await connect()
  if (err) {
    return err
  }

  const user = await User.findOne({ email: email.toLowerCase() })
  if (!user) return errorRes(404, 'user not found', { email })

  const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET!, {
    expiresIn: '2h',
  })

  const link = `${process.env.SITE_URL}/updatePassword?token=${token}`

  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: +process.env.EMAIL_PORT!,
    auth: {
      user: process.env.EMAIL_ADDRESS,
      pass: process.env.EMAIL_PASSWORD,
    },
  })

  try {
    await transporter.sendMail({
      from: `"Campainha Whats" <${process.env.EMAIL_ADDRESS}>`,
      to: user.email,
      subject: 'Recuperação de senha',
      text: `Link para criar nova senha (expira em 2 horas): ${link}`,
      html: `<a href="${link}" target="_blank"> Clique aqui para criar uma nova senha. </a> <br><br> Este link expira em 2 horas.`,
    })
  } catch (err) {
    console.log(err)
    return res(500, 'Error sending email')
  }

  return res(200)
}

export { handler }
