import { Cart } from "./Cart.js";

export class Order {
  constructor(cart) {
    this.orderDate = new Date();
    this.cart = cart;
  }

  printOrder() {
    console.log("Tellimuse kuupäev:", this.orderDate.toLocaleString());
    for (let i = 0; i < this.cart.items.length; i++) {
      const item = this.cart.items[i];
      console.log(item.product.name + " x " + item.quantity);
    }
    console.log("Kokku:", this.cart.calculateTotal() + "€");
  }
}

// Kuvage tellimuste ajalugu
