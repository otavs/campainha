import { Handler } from '@netlify/functions'
import { connect } from 'mongoose'
import User from './schemas/user'

const handler: Handler = async (ev, context) => {
  // TODO: handle methods, auth

  try {
    await connect(process.env.CONNECTION_STRING!)
  } catch (err) {
    console.log(err)
    return {
      statusCode: 500,
      body: 'Error connecting to db',
    }
  }

  const user = new User({
    email: 'Bill',
  })

  try {
    await user.save()
  } catch (err) {
    console.log(err)
    return {
      statusCode: 500,
      body: `Error creating user ${JSON.stringify(user)}`,
    }
  }

  return {
    statusCode: 200,
    body: JSON.stringify([user]),
  }
}

export { handler }
