class Delivery {
  constructor(id, orderId, deliveryDate, status) {
    this._id = id;
    this._orderId = orderId;
    this._deliveryDate = deliveryDate;
    this._status = status;
  }
  get id() {
    return this._id;
  }
  get orderId() {
    return this._orderId;
  }
  get deliveryDate() {
    return this._deliveryDate;
  }
  get status() {
    return this._status;
  }
  set status(status) {
    this._status = status;
  }
  
  set deliveryDate(deliveryDate) {
    this._deliveryDate = deliveryDate;
  }
  set  orderId(orderId) {
    this._orderId = orderId;
  }
  set id(id) {
    this._id = id;
  }
}

export default Delivery;