
class Product {
  constructor(id, title, price, category) {
    this.id = id;
    this.title = title;
    this.price = price;
    this.category = category;
  }

  describe() {
    return `${this.title} - ${this.price}€ (${this.category})`;
  }

  static discountedPrice(price, percent) {
    return price - price * (percent / 100);
  }
}

const laptop = new Product(1, "sülearvuti", 1000, "elektroonika");
console.log(laptop.describe());
console.log(Product.discountedPrice(laptop.price, 10));

class Cart {
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

class Order {
constructor(cart) {
this.orderDate = new Date();
this.cart = cart;
}


printOrder() {
console.log("Tellimuse kuupäev:", this.orderDate.toLocaleString());
for (let i = 0; i < this.cart.items.length; i++) {
const item = this.cart.items[i];
console.log(item.product.title + " x " + item.quantity);
}
console.log("Kokku:", this.cart.calculateTotal() + "€");
}
}

class Customer {
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