import Product from "./product.js";

class ProductController {
  constructor() {
    this.products = [
      new Product("1", "Product 1", "Description 1", 100),
      new Product("2", "Product 2", "Description 2", 200),
      new Product("3", "Product 3", "Description 3", 300),
    ];
  }
}
