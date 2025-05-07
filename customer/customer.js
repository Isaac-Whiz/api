import User from "../utils/user.js";
class Customer extends User {
  constructor(
    id,
    firstName,
    lastName,
    email,
    password,
    role,
    contactNumber,
    address,
    city,
    state,
    country
  ) {
    super(firstName, lastName, email, password, role);
    this._id = id;
    this._contactNumber = contactNumber;
    this._address = address;
    this._city = city;
    this._state = state;
    this._country = country;
  }

  get id() {
    return this._id;
  }
  get contactNumber() {
    return this._contactNumber;
  }
  get address() {
    return this._address;
  }
  get city() {
    return this;
  }
  get state() {
    return this._state;
  }
  get country() {
    return this._country;
  }
  set contactNumber(contactNumber) {
    this._contactNumber = contactNumber;
  }
  set address(address) {
    this._address = address;
  }
  set city(city) {
    this._city = city;
  }
  set state(state) {
    this._state = state;
  }
  set country(country) {
    this._country = country;
  }
}

export default Customer;
