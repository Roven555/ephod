import { Product } from "./Product.js";

export class Cart {
  constructor() {
    this.items = [];
  }

  addProduct(product, quantity = 1) {
    for (let i = 0; i < this.items.length; i++) {
      if (this.items[i].product.id === product.id) {
        this.items[i].quantity += quantity;
        return;
      }
    }
    this.items.push({ product: product, quantity: quantity });
  }

  removeProduct(productId) {
    for (let i = 0; i < this.items.length; i++) {
      if (this.items[i].product.id === productId) {
        this.items.splice(i, 1);
        return;
      }
    }
  }

  calculateTotal() {
    let total = 0;
    for (let i = 0; i < this.items.length; i++) {
      total += this.items[i].product.price * this.items[i].quantity;
    }
    return total;
  }

  get totalItems() {
    let count = 0;
    for (let i = 0; i < this.items.length; i++) {
      count += this.items[i].quantity;
    }
    return count;
  }
}

const cart = new Cart();
cart.addProduct(laptop, 2);
console.log("Cart totalItems:", cart.totalItems);
console.log("Cart calculateTotal:", cart.calculateTotal());
