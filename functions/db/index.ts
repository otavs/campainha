import mongoose from 'mongoose'

export async function connect() {
  try {
    await mongoose.connect(process.env.CONNECTION_STRING!)
  } catch (err) {
    console.log(err)
    return {
      statusCode: 500,
      body: 'Error connecting to db',
    }
  }
}
