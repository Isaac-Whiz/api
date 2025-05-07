import Administrator from "./administrator.js";

class AdministratorController {
  constructor() {
    this.administrators = [
      new Administrator(
        1,
        "John",
        "Doe",
        "john@example.com",
        "password",
        "admin",
        "IT"
      ),
      new Administrator(
        2,
        "Jane",
        "Doe",
        "jane@example.com",
        "password",
        "admin",
        "HR"
      ),
      new Administrator(
        3,
        "Bob",
        "Smith",
        "bob@example.com",
        "password",
        "admin",
        "Finance"
      ),
      new Administrator(
        4,
        "Alice",
        "Johnson",
        "alice@example.com",
        "password",
        "admin",
        "Marketing"
      ),
      new Administrator(
        5,
        "Mike",
        "Brown",
        "mike@example.com",
        "password",
        "admin",
        "Operations"
      ),
    ];
  }

  saveAdministrator(administrator) {
    this.administrators.push(administrator);
  }
  getAdministratorById(id) {
    const numId = parseInt(id);
    return this.administrators.find(
      (administrator) => administrator._id === numId
    );
  }
  deleteAdministrator(id) {
    const numId = this.#parseParam(id);
    this.administrators = this.administrators.filter(
      (administrator) => administrator._id !== numId
    );
  }
  updateAdministrator(id, updatedAdministrator) {
    const numId = this.#parseParam(id);
    const index = this.administrators.findIndex(
      (administrator) => administrator._id === numId
    );
    if (index !== -1) {
      this.administrators[index] = updatedAdministrator;
    }
  }
  getAdministrators() {
    return this.administrators;
  }

  #parseParam(param) {
    return parseInt(param);
  }
}

export default AdministratorController;
