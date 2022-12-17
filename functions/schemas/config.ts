import { Schema, Types, model } from 'mongoose'

export interface IConfig {
  _id?: Types.ObjectId | string
  configName: string
  title: string
}

const configSchema = new Schema<IConfig>({
  configName: { type: String, required: true, unique: true },
  title: { type: String, required: false },
})

export const Config = model<IConfig>('Config', configSchema)
