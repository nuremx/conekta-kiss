const got = require('got')
const btoa = require('btoa')

const BASE_URL = 'https://api.conekta.io'

async function makeHttpRequest(method, { path, context, body }) {
  if (!context) {
    throw new Error('Invalid configuration, missing private key')
  }

  const url = `${BASE_URL}${path}`

  const config = {
    method,
    headers: {
      Authorization: `Basic ${btoa(context.API_KEY)}:`,
      Accept: 'application/vnd.conekta-v2.0.0+json',
      'Content-Type': 'application/json',
    },
    responseType: 'json',
  }

  if (body) config.body = body

  let { body: responseBody } = await got(url, config)
  responseBody = JSON.parse(responseBody)

  return responseBody
}

module.exports = makeHttpRequest
