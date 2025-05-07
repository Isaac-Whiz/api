class Order {
  constructor(id, customerId, date, status, products) {
    this._id = id;
    this._customerId = customerId;
    this._date = date;
    this._status = status;
    this._products = products;
  }
  get id() {
    return this._id;
  }
  get customerId() {
    return this._customerId;
  }
  get date() {
    return this._date;
  }
  get status() {
    return this._status;
  }
  get products() {
    return this._products;
  }
  set status(status) {
    this._status = status;
  }
}

export default Order;
