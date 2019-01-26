const request = require('request-promise-native')
const base64 = require('base-64')

const BASE_URL = 'https://api.conekta.io'

async function makeHttpRequest(method, { path, context, body }) {
  if (!context) {
    throw new Error('Invalid configuration, missing private key')
  }

  const config = {
    method,
    url: `${BASE_URL}${path}`,
    headers: {
      Authorization: `Basic ${base64.encode(context.API_KEY)}:`,
      Accept: 'application/vnd.conekta-v2.0.0+json',
      'Content-Type': 'application/json',
    },
  }

  if (body) {
    config.body = JSON.stringify(body)
  }

  const response = await request(config)
  return JSON.parse(response)
}

module.exports = makeHttpRequest
