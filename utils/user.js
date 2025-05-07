class User {
  constructor(firstName, lastName, email, password, role) {
    this._firstName = firstName;
    this._lastName = lastName;
    this._email = email;
    this._password = password;
    this._role = role;
  }

  get firstName() {
    return this._firstName;
  }

  set firstName(firstName) {
    this._firstName = firstName;
  }

  get lastName() {
    return this._lastName;
  }

  set lastName(lastName) {
    this._lastName = lastName;
  }

  get email() {
    return this._email;
  }

  set email(email) {
    this._email = email;
  }

  get password() {
    return this._password;
  }

  set password(password) {
    this._password = password;
  }

  get role() {
    return this._role;
  }

  set role(role) {
    this._role = role;
  }
}

export default User;
