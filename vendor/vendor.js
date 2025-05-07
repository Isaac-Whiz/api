import User from "../utils/user.js";

class Vendor extends User {
  constructor(
    id,
    firstName,
    lastName,
    email,
    password,
    role,
    contactNumber,
    address,
    status
  ) {
    super(firstName, lastName, email, password, role);
    this._id = id;
    this._contactNumber = contactNumber;
    this._address = address;
    this._status = status;
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
  get status() {
    return this._status;
  }
  set contactNumber(contactNumber) {
    this._contactNumber = contactNumber;
  }
  set address(address) {
    this._address = address;
  }
  set status(status) {
    this._status = status;
  }
  set id(id) {
    this._id = id;
  }
}

export default Vendor;
