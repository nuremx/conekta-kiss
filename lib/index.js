const Customer = require('./Customer')
const Order = require('./Order')
const PaymentSource = require('./PaymentSource')

const conekta = {
  configure(apiKey) {
    this.API_KEY = apiKey

    this.Customer = Customer
    this.Customer.prototype.API_KEY = apiKey
    this.Customer.API_KEY = apiKey

    this.Order = Order
    this.Order.prototype.API_KEY = apiKey
    this.Order.API_KEY = apiKey

    this.PaymentSource = PaymentSource
    this.PaymentSource.prototype.API_KEY = apiKey
    this.PaymentSource.API_KEY = apiKey
  },
}

module.exports = conekta
