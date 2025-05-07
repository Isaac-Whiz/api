import Vendor from "./vendor.js";

class VendorController {
  constructor() {
    this.vendors = [
      new Vendor(
        1,
        "John",
        "Doe",
        "john@example.com",
        "password",
        "admin",
        "1234567890",
        "123 Main St",
        "active"
      ),
      new Vendor(
        2,
        "Jane",
        "Doe",
        "jane@example.com",
        "password",
        "admin",
        "0987654321",
        "456 Main St",
        "active"
      ),
      new Vendor(
        3,
        "Bob",
        "Smith",
        "bob@example.com",
        "password",
        "admin",
        "1112223333",
        "789 Main St",
        "active"
      ),
      new Vendor(
        4,
        "Alice",
        "Johnson",
        "alice@example.com",
        "password",
        "admin",
        "4445556666",
        "101 Main St",
        "active"
      ),
      new Vendor(
        5,
        "Tom",
        "Jones",
        "tom@example.com",
        "password",
        "admin",
        "7778889999",
        "222 Main St",
        "active"
      ),
    ];
  }
  getVendors() {
    return this.vendors;
  }
  getVendorById(id) {
    const vendor = this.vendors.find((vendor) => vendor._id === parseInt(id));
    if (!vendor) {
      throw new Error("Vendor not found");
    }
    return vendor;
  }

  saveVendor(vendor) {
    this.vendors.push(vendor);
    return vendor;
  }
  updateVendor(id, updatedVendor) {
    const index = this.vendors.findIndex(
      (vendor) => vendor._id === parseInt(id)
    );
    if (index === -1) {
      throw new Error("Vendor not found");
    }
    this.vendors[index] = { ...this.vendors[index], ...updatedVendor };
    return this.vendors[index];
  }
  deleteVendor(id) {
    const index = this.vendors.findIndex(
      (vendor) => vendor._id === parseInt(id)
    );
    if (index === -1) {
      throw new Error("Vendor not found");
    }
    this.vendors.splice(index, 1);
  }
}

export default VendorController;
