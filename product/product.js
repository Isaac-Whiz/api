class Product {
  constructor(id, name, price, description) {
    this._id = id;
    this._name = name;
    this._price = price;
    this._description = description;
  }

  get id() {
    return this._id;
  }
  get name() {
    return this._name;
  }
  get price() {
    return this._price;
  }
  get description() {
    return this._description;
  }
  set name(value) {
    this._name = value;
  }
  set price(value) {
    this._price = value;
  }
  set description(value) {
    this._description = value;
  }
}

export default Product;
