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

    if (args.created_at) this.createdAt = new Date(args.created_at)
    if (args.updated_at) this.updatedAt = new Date(args.updated_at)
    if (args.id) this.id = args.id
    if (args.amount_refunded) this.amountRefunded = args.amount_refunded
    if (args.payment_status) this.paymentStatus = args.payment_status
    if (args.amount) this.amount = args.amount / 100 // Convert to float
  }

  async save() {
    const {
      currency = required('currency'),
      customerInfo = required('customerInfo'),
      lineItems = required('lineItems'),
      charges = required('charges'),
      taxLines,
    } = this

    const body = {
      currency,
      customer_info: {
        customer_id: customerInfo.customerId,
      },
      line_items: lineItems.map(
        ({
          name = required('name'),
          unitPrice = required('unitPrice'),
          quantity = required('quantity'),
        }) => ({
          name,
          unit_price: unitPrice,
          quantity,
        })
      ),
      charges: charges.map(({ paymentMethod }) => ({
        payment_method: paymentMethod,
      })),
      taxLines,
    }

    try {
      const response = await makeHttpRequest('POST', {
        path: '/orders',
        body,
        context: this,
      })

      return new Order(response)
    } catch (error) {
      throw new Error(error)
    }
  }
}

module.exports = Order
