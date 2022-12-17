import { Handler } from '@netlify/functions'
import { Config } from './schemas/config'
import { handleRequest, res, errorRes } from './common'
import { Event } from './common'

const routes = {
  GET: {
    '/config': [getConfig, ['all']],
  },
  PUT: {
    '/config': [updateConfig, ['root']],
  },
}

async function getConfig(ev: Event) {
  try {
    const config = await Config.findOne({ configName: 'default' })
    if (!config) return errorRes(404, 'default config not found')
    return res(200, config)
  } catch (err) {
    console.log(err)
    return errorRes(500, 'error getting config from db', err)
  }
}

async function updateConfig(ev: Event) {
  if (!ev.body) return errorRes(400, 'missing body from request')

  const body = JSON.parse(ev.body) as any
  if (typeof body != 'object')
    return errorRes(400, 'body must be a JSON object')

  try {
    await Config.findOneAndUpdate({ configName: 'default' }, body)
    return res(200)
  } catch (err) {
    console.log(err)
    return errorRes(500, 'error updating user', err)
  }
}

const handler: Handler = async (ev: Event, ctx) => {
  return await handleRequest(ev, ctx, routes)
}

export { handler }
