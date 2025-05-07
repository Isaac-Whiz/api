import User from "../utils/user.js";

class Courier extends User {
  constructor(id, firstName, lastName, email, password, role, status) {
    super(firstName, lastName, email, password, role);
    this._id = id;
    this._status = status;
  }
  get id() {
    return this._id;
  }
  set id(id) {
    this._id = id;
  }
  get status() {
    return this._status;
  }
  set status(status) {
    this._status = status;
  }
}

export default Courier;
