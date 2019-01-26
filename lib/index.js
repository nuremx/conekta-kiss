const Customer = require('./Customer')

const conekta = {
  configure(apiKey) {
    this.API_KEY = apiKey

    this.Customer = Customer
    this.Customer.prototype.API_KEY = apiKey
    this.Customer.API_KEY = apiKey
  },
}

module.exports = conekta
