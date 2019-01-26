<img src="https://raw.githubusercontent.com/nuremx/conekta-kiss/master/.github/banner.png" align="center" alt="Conekta KISS banner" />

# Conekta Node SDK

[![Maintainability](https://api.codeclimate.com/v1/badges/57cbb329b5b079b8b249/maintainability)](https://codeclimate.com/repos/5c4cbff6d595ed02d0001a88/maintainability)
[![npm version](https://badge.fury.io/js/conekta-kiss.svg)](https://badge.fury.io/js/conekta-kiss)
[![Dependencies](https://david-dm.org/nuremx/conekta-kiss.svg)](https://david-dm.org/nuremx/conekta-kiss)

> Based on KISS principle

Conekta NodeJS SDK for people who like modern JS, small dependencies and code that can be written and understood.

## Installation

```bash
~ npm i conekta-kiss # yarn add conekta-kiss
```

## Documentation

### Requirements

- `node >= 6.0.0`

### Setup

Get your Conekta API keys at `https://admin.conekta.com/`

#### Usage example

```javascript
import conekta from 'conekta-kiss'

// Add your Conekta API private key
conekta.config('9YxqfRnx4sMQDnRsqdYn')

try {
  // Create customer
  const customer = await new conekta.Customer({
    name: 'John Appleseed',
    email: 'johnappleseed@mail.com',
  })

  // Update customer attributes
  customer.name = 'Mr. John Appleseed'
  await customer.save()

  // Add payment sources
  const paymentSource = await customer.addPaymentSource({ token: '' })

  // Get customer by id
  const otherCustomer = await conekta.Customer.findById('9j821831283huas')
} catch (error) {
  console.log('Some error ocurred', error)
}
```

## API

### Customer

`conekta.Customer`

#### Attributes

| Name                       | Type                        |
| -------------------------- | --------------------------- |
| `id`                       | `String`                    |
| `name`                     | `String`                    |
| `email`                    | `String`                    |
| `phone`                    | `String`                    |
| `shippingContacts`         | `[conekta.ShippingContact]` |
| `paymentSources`           | `[conekta.PaymentSource]`   |
| `defaultPaymentSourceId`   | `String`                    |
| `defaultShippingContactId` | `String`                    |

#### Functions

| Name                                        | Returns                              | Description                              |
| ------------------------------------------- | ------------------------------------ | ---------------------------------------- |
| `Customer.prototype.findById(id: String)`   | `Promise` => `conekta.Customer`      | Finds customer by given id [Static]      |
| `Customer.prototype.deleteById(id: String)` | `Promise` => `Boolean`               | Removes customer by given id [Static]    |
| `Customer.remove()`                         | `Promise` => `Boolean`               | Removes existing customer                |
| `Customer.addPaymentSource(args: Object)`   | `Promise` => `conekta.PaymentSource` | Adds payment source to existing customer |
| `Customer.update(id: String, args: Object)` | `Promise` => `conekta.Customer`      | Updates existing customer                |

### PaymentSource

`conekta.Customer.PaymentSource`

WIP

### Orders

`conekta.Orders`

WIP

## Todo

- [ ] Plans
- [ ] Subscriptions

## License

MIT
