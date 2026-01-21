export class Product {
  constructor(id, name, price, category, description = "", image = "", rating = null) {
    this.id = id;
    this.name = name;
    this.price = price;
    this.category = category;
    this.description = description;
    this.image = image;
    this.rating = rating;
  }

  describe() {
    return this.name + " - " + this.price + "€ (" + this.category + ")";
  }

  static discountedPrice(price, percent) {
    return price - (price * (percent / 100));
  }
}