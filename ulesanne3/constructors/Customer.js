import { Order } from "./Order.js";

export class Customer {
  constructor(name) {
    this.name = name;
    this.orderHistory = [];
    this.favorites = [];
  }

  placeOrder(cart) {
    const order = new Order(cart);
    this.orderHistory.push(order);
  }

  toggleFavorites(product) {
    const idx = this.favorites.findIndex(
      (it) => it.product && it.product.id === product.id
    );
    if (idx === -1) {
      this.favorites.push({ product });
    } else {
      this.favorites.splice(idx, 1);
    }
  }

  getAllFavorites() {
    return this.favorites;
  }

  printOrderHistory() {
    for (let i = 0; i < this.orderHistory.length; i++) {
      const order = this.orderHistory[i];
      console.log(
        order.orderDate.toLocaleString() +
          " - " +
          order.cart.calculateTotal() +
          "€"
      );
    }
  }
}

export const customerConstructor = new Customer("Alice");
