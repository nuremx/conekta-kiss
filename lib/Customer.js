const ConektaError = require('./errors/ConektaError')
const PaymentSource = require('./PaymentSource')
const makeHttpRequest = require('./http')
const { required } = require('./utils')

class Customer {
  constructor(args) {
    this.id = args.id
    this.name = args.name
    this.email = args.email
    this.phone = args.phone
    this.shippingContacts = args.shippingContacts
    this.paymentSources =
      args.paymentSources ||
      (args.payment_sources &&
        args.payment_sources.data &&
        args.payment_sources.data.map((data) => new PaymentSource(data))) ||
      []
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

    try {
      const response = await makeHttpRequest(id ? 'PUT' : 'POST', {
        path: id ? `/customers/${id}` : '/customers',
        body,
        context: this,
      })

      this.id = response.id
      this.name = response.name
      this.email = response.email
      this.phone = response.phone
      this.paymentSources = response.payment_sources
      this.shippingContacts = response.shipping_contacts

      return this
    } catch (error) {
      throw new Error(error)
    }
  }

  static async findById(id) {
    const response = await makeHttpRequest('GET', {
      path: `/customers/${id}`,
      context: this,
    })

    return new Customer(response)
  }

  async addPaymentSource({ type = 'card', tokenId }) {
    try {
      const response = await makeHttpRequest('POST', {
        path: `/customers/${this.id}/payment_sources`,
        body: { type, token_id: tokenId },
        context: this,
      })

      return new PaymentSource(response)
    } catch (error) {
      throw new ConektaError({
        message: 'Could not add payment source', // JSON.parse(error.response.body),
        httpStatusCode: error.statusCode,
      })
    }
  }

  async removePaymentSource(id) {
    try {
      await makeHttpRequest('DELETE', {
        path: `/customers/${this.id}/payment_sources/${id}`,
        context: this,
      })

      return true
    } catch (error) {
      throw new ConektaError({ message: 'Could not remove payment source' })
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
