// main.js

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
    return price - (price * (percent / 100));
  }
}

const laptop = new Product(1, 'sülearvuti', 1000, 'elektroonika');
console.log(laptop.describe());
console.log(Product.discountedPrice(laptop.price, 10));



class Cart {
  constructor(id, title, price, category) {
    this.id = id;
    this.title = title;
    this.price = price;
    this.category = category;
}
}

