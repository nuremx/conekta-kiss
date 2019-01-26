<img src="https://raw.githubusercontent.com/nuremx/conekta-kiss/master/.github/banner.png" align="center" alt="Conekta KISS banner" />

# Conekta Node SDK

[![npm version](https://badge.fury.io/js/conekta-kiss.svg)](https://badge.fury.io/js/conekta-kiss)
[![Dependencies](https://david-dm.org/nuremx/conekta-kiss.svg)](https://david-dm.org/nuremx/conekta-kiss)
[![Maintainability](https://api.codeclimate.com/v1/badges/57cbb329b5b079b8b249/maintainability)](https://codeclimate.com/repos/5c4cbff6d595ed02d0001a88/maintainability)

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
  }).save()

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

| Name                                  | Type                        |
| ------------------------------------- | --------------------------- |
| `id`                                  | `String`                    |
| `email`                               | `String`                    |
| `name`                                | `String`                    |
| `phone` _optional_                    | `String`                    |
| `shippingContacts` _optional_         | `[conekta.ShippingContact]` |
| `paymentSources` _optional_           | `[conekta.PaymentSource]`   |
| `defaultPaymentSourceId` _optional_   | `String`                    |
| `defaultShippingContactId` _optional_ | `String`                    |

#### Functions

| Name                                                       | Returns                              | Description                                                                    |
| ---------------------------------------------------------- | ------------------------------------ | ------------------------------------------------------------------------------ |
| `Customer({ name: String, email: String, phone: String })` | `conekta.Customer`                   | **Constructor** Creates `conekta.Customer` instance, to save to call `.save()` |
| `Customer.findById(id: String)`                            | `Promise` => `conekta.Customer`      | Finds customer by given id (_static_)                                          |
| `Customer.deleteById(id: String)`                          | `Promise` => `Boolean`               | Removes customer by given id (_static_)                                        |
| `Customer.update(id: String, customer: Object)`            | `Promise` => `conekta.Customer`      | Updates existing customer                                                      |
| `save()`                                                   | `Promise` => `Boolean`               | Saves customer instance, creating new or updating                              |
| `remove()`                                                 | `Promise` => `Boolean`               | Removes existing customer                                                      |
| `addPaymentSource(paymentSource: Object)`                  | `Promise` => `conekta.PaymentSource` | Adds _payment source_ to existing customer                                     |
| `removePaymentSource(id: String)`                          | `Promise` => `Boolean`               | Removes _payment source_ from existing customer                                |

### PaymentSource

`conekta.PaymentSource`

#### Attributes

| Name         | Type      | Description                                     |
| ------------ | --------- | ----------------------------------------------- |
| `id`         | `String`  |                                                 |
| `last4`      | `String`  | Last 4 digits of card                           |
| `type`       | `String`  | Payment type `['card']`                         |
| `createdAt`  | `Date`    |                                                 |
| `bin`        | `Int`     | Bank Identification Number                      |
| `expMonth`   | `Int`     | Month of expiry (1 - 12)                        |
| `expYear`    | `Int`     | Year of expiry (four-digit)                     |
| `brand`      | `String`  | Card brand `['VISA', 'MC', 'AMERICAN_EXPRESS']` |
| `name`       | `String`  | Cardholder's name                               |
| `customerId` | `String`  |                                                 |
| `isDefault`  | `Boolean` |                                                 |

#### Functions

| Name                                                               | Returns                              | Description                        |
| ------------------------------------------------------------------ | ------------------------------------ | ---------------------------------- |
| `PaymentSource({ token: String, customer: String, type: String })` | `Promise` => `conekta.PaymentSource` | **Constructor**                    |
| `PaymentSource.update(id: String, paymentSource: Object)`          | `Promise` => `conekta.PaymentSource` | Updates payment source by given id |
| `save()`                                                           | `Promise` => `conekta.PaymentSource` | Updates payment source instance    |
| `remove()`                                                         | `Promise` => `Boolean`               | Deletes payment source             |

### Order

`conekta.Orders`

#### Attributes

| Name           | Type                | Description            |
| -------------- | ------------------- | ---------------------- |
| `currency`     | `String`            | Currency of the charge |
| `customerInfo` | `Object`            |                        |
| `lineItems`    | `Int`               |                        |
| `charges`      | `[Object]`          |                        |
| `taxLines`     | `String` _optional_ |                        |

#### Functions

| Name                                                                                        | Returns                      | Description     |
| ------------------------------------------------------------------------------------------- | ---------------------------- | --------------- |
| `Order({ currency: String, customerInfo: Object, lineItems: [Object], charges: [Object] })` | `Promise` => `conekta.Order` | **Constructor** |

## Todo

- [ ] Plans
- [ ] Subscriptions

## License

MIT
