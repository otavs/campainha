import { Schema, model } from 'mongoose'

interface IUser {
  name: string
  email: string
  password: string
  phone: string
}

const userSchema = new Schema<IUser>({
  email: { type: String, required: true },
})

export default model<IUser>('User', userSchema)
