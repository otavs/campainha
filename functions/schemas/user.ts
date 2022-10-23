import { Schema, model } from 'mongoose'

export interface IUser {
  name: string
  email: string
  password?: string
  role?: string
  phone?: string
  address?: string
  description?: string
}

const userSchema = new Schema<IUser>({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, required: true },
  phone: { type: String, required: false },
  address: { type: String, required: false },
  description: { type: String, required: false },
})

export const User = model<IUser>('User', userSchema)
