export class Product {
  constructor(id, name, price, category) {
    this.id = id;
    this.name = name;
    this.price = price;
    this.category = category;
  }

  describe() {
    return this.name + " - " + this.price + "€ (" + this.category + ")";
  }

  static discountedPrice(price, percent) {
    return price - (price * (percent / 100));
  }
}

const laptop = new Product(1, 'Sülearvuti', 999.99, 'Elektroonika');

const phone = new Product(2, 'Telefon', 599.99, 'Elektroonika');
