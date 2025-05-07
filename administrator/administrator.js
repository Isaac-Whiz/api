import User from "../utils/user.js";

class Administrator extends User {
  constructor(id, firstName, lastName, email, password, role, department) {
    super(firstName, lastName, email, password, role);
    this._id = id;
    this._department = department;
    this.createdAt = new Date();
  }

  getId() {
    return this._id;
  }

  setId(id) {
    this._id = id;
  }

  getDepartment() {
    return this._department;
  }
  setDepartment(department) {
    this._department = department;
  }
  getCreatedAt() {
    return this.createdAt;
  }
  setCreatedAt(createdAt) {
    this.createdAt = createdAt;
  }
}

export default Administrator;
