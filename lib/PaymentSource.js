class PaymentSource {
  constructor(args) {
    this.id = args.id;
    this.type = args.type;
    this.createdAt = new Date(args.created_at * 1000);
    this.last4 = parseInt(args.last4, 10);
    this.bin = parseInt(args.bin, 10);
    this.expMonth = parseInt(args.exp_month, 10);
    this.expYear = 2000 + parseInt(args.exp_year, 10);
    this.brand = args.brand;
    this.name = args.name;
    this.customerId = args.parent_id;
    this.isDefault = args.default;
  }
}

module.exports = PaymentSource;
