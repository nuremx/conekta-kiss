const ConektaError = require('./errors/ConektaError')
const makeHttpRequest = require('./http')
const { required } = require('./utils')

class Order {
  constructor(args) {
    this.currency = args.currency
    this.customerInfo = args.customerInfo
    this.lineItems = args.lineItems
    this.charges = args.charges
    this.taxLines = args.taxLines
  }

  async save() {
    const {
      currency = required('currency'),
      customerInfo = required('customerInfo'),
      lineItems = required('email'),
      charges = required('charges'),
      taxLines = required('taxLines'),
    } = this

    const body = {
      currency,
      customer_info: {
        customer_id: customerInfo.customerId,
      },
      line_items: lineItems,
      charges,
      taxLines,
    }

    try {
      let response = await makeHttpRequest('POST', {
        path: '/orders',
        body,
        context: this,
      })

      response = JSON.parse(response)

      console.log({ response })

      this.id = id
      this.currency = currency
      this.customerInfo = customerInfo
      this.lineItems = lineItems
      this.charges = charges
      this.taxLines = taxLines

      return this
    } catch (error) {
      throw new Error(error)
    }
  }
}

module.exports = Order
