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

  updateProductQuantity(productId, delta) {
    for (let i = 0; i < this.items.length; i++) {
      if (this.items[i].product.id === productId) {
        this.items[i].quantity += delta;

        if (this.items[i].quantity <= 0) {
          this.removeProduct(i);
        }
        return;
      }
    }
  }

  removeProduct(index) {
    if (index >= 0 && index < this.items.length) {
      this.items.splice(index, 1);
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

  clear() {
    this.items = [];
  }
}

// Convenience API expected by views
Cart.prototype.getAllProducts = function () {
  return this.items;
};

Cart.prototype.calculateTotalWithoutVAT = function (vatPercent = 20) {
  const total = this.calculateTotal();
  return total / (1 + vatPercent / 100);
};

Cart.prototype.calculateTotalVAT = function (vatPercent = 20) {
  return this.calculateTotal() - this.calculateTotalWithoutVAT(vatPercent);
};

Cart.prototype.removeProduct = function (productId) {
  const idx = this.items.findIndex((it) => it.product.id === productId);
  if (idx !== -1) this.items.splice(idx, 1);
};

export const cartConstructor = new Cart();
