const ConektaError = require('./errors/ConektaError')
const PaymentSource = require('./PaymentSource')
const makeHttpRequest = require('./http')

function required(paramName) {
  throw new Error(`Missing argument' ${paramName}'`)
}

class Customer {
  constructor(args) {
    this.id = args.id
    this.name = args.name
    this.email = args.email
    this.phone = args.phone
    this.paymentSources = args.paymentSources
    this.shippingContacts = args.shippingContacts
    this.paymentSources =
      args.paymentSources ||
      (args.payment_sources &&
        args.payment_sources.data &&
        args.payment_sources.data.map((data) => new PaymentSource(data)))
    this.defaultPaymentSourceId =
      args.defaultPaymentSourceId || args.default_payment_source_id
    this.defaultShippingContactId =
      args.defaultShippingContactId || args.default_shipping_contact_id
  }

  static async deleteById(id) {
    try {
      await makeHttpRequest('DELETE', {
        path: `/customers/${id}`,
        context: this,
      })

      return true
    } catch (error) {
      throw new ConektaError({
        message: 'Could not delete customer', // JSON.parse(error.response.body),
        httpStatusCode: error.statusCode,
      })
    }
  }

  remove() {
    const { id } = this
    return Customer.deleteById(id)
  }

  async save() {
    const {
      id,
      name = required('name'),
      email = required('email'),
      phone,
      paymentSources,
      shippingContacts,
    } = this

    const body = {
      name,
      email,
      phone,
      paymentSources,
      shippingContacts,
    }

    let response
    try {
      response = await makeHttpRequest(id ? 'PUT' : 'POST', {
        path: id ? `/customers/${id}` : '/customers',
        body,
        context: this,
      })
    } catch (error) {
      throw new Error(error)
    }

    if (!response) {
      return new Error('Invalid server response')
    }

    response = JSON.parse(response)

    this.name = response.name
    this.email = response.email
    this.phone = response.phone
    this.paymentSources = response.paymentSources
    this.shippingContacts = response.shippingContacts
    this.id = response.id

    return this
  }

  static async findById(id) {
    let response = await makeHttpRequest('GET', {
      path: `/customers/${id}`,
      context: this,
    })

    response = JSON.parse(response)

    return new Customer(response)
  }

  async addPaymentSource({ type = 'card', tokenId }) {
    try {
      const response = await makeHttpRequest('POST', {
        path: `/customers/${this.id}/payment_sources`,
        context: this,
        body: {
          type,
          token_id: tokenId,
        },
      })

      return new PaymentSource(response)
    } catch (error) {
      throw new ConektaError({
        message: 'Could not add payment source', // JSON.parse(error.response.body),
        httpStatusCode: error.statusCode,
      })
    }
  }

  static async update(id, args) {
    const customer = await Customer.findById(id)

    const fields = Object.keys(args)
    fields.forEach((key) => {
      customer[key] = args[key]
    })

    customer.save()

    return customer
  }
}

module.exports = Customer
