import { Schema, Types, model } from 'mongoose'

export interface IUser {
  _id?: Types.ObjectId | string
  name?: string
  email?: string
  password?: string
  role?: string
  phone?: string
  address?: string
  description?: string
  enabled?: boolean
}

const userSchema = new Schema<IUser>({
  name: { type: String, required: true },
  role: { type: String, required: true },
  email: { type: String, required: false, unique: true, sparse: true },
  password: { type: String, required: false },
  phone: { type: String, required: false },
  address: { type: String, required: false },
  description: { type: String, required: false },
  enabled: { type: Boolean, required: false },
})

export const User = model<IUser>('User', userSchema)
