const ConektaError = require('./errors/ConektaError')
const { required } = require('./utils')
const makeHttpRequest = require('./http')

class PaymentSource {
  constructor(args) {
    this.id = args.id
    this.type = args.type
    this.createdAt = new Date(args.created_at * 1000)
    this.last4 = args.last4
    this.bin = parseInt(args.bin, 10)
    this.expMonth = parseInt(args.exp_month, 10)
    this.expYear = 2000 + parseInt(args.exp_year, 10)
    this.brand = args.brand
    this.name = args.name
    this.customerId = args.parent_id
    this.isDefault = args.default

    if (args.customer) this.customer = args.customer
    if (args.token) this.token = args.token
    if (args.customer) this.customerId = args.customer
  }

  async save() {
    const { id, customerId, type = required('type') } = this

    let response
    if (id) {
      // response = await makeHttpRequest(id ? 'PUT' : 'POST', {
      //   path: id ? `/customers/${id}` : '/customers',
      //   body: {},
      //   context: this,
      // })
    } else {
      const body = {
        token_id: this.token || required('token'),
        type,
      }

      response = await makeHttpRequest('POST', {
        path: `/customers/${customerId}/payment_sources`,
        body,
        context: this,
      })
    }

    return new PaymentSource(response)
  }

  async update() {}
}

module.exports = PaymentSource
