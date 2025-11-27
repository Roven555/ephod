import { Order } from './order.js';

export class Customer {
  constructor(name) {
    this.name = name;
    this.orderHistory = [];
  }

  placeOrder(cart) {
    const order = new Order(cart);
    this.orderHistory.push(order);
  }

  printOrderHistory() {
    for (let i = 0; i < this.orderHistory.length; i++) {
      const order = this.orderHistory[i];
      console.log(order.orderDate.toLocaleString() + " - " + order.cart.calculateTotal() + "€");
    }
  }
}

const customer = new Customer('Alice');

customer.placeOrder(cart);
