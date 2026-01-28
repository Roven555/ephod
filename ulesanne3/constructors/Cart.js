export class Cart {
  constructor() {

    const savedCart = localStorage.getItem("shoppingCart");
    this.items = savedCart ? JSON.parse(savedCart) : [];
  }


  saveToStorage() {
    localStorage.setItem("shoppingCart", JSON.stringify(this.items));
  }

  addProduct(product, quantity = 1) {
    const existingItem = this.items.find(item => item.product.id === product.id);
    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      this.items.push({ product: product, quantity: quantity });
    }
    this.saveToStorage(); 
  }

  updateProductQuantity(productId, delta) {
    const item = this.items.find(item => item.product.id === productId);
    if (item) {
      item.quantity += delta;
      if (item.quantity <= 0) {
        this.removeProduct(productId);
      }
    }
    this.saveToStorage(); 
  }

  removeProduct(productId) {
    this.items = this.items.filter(item => item.product.id !== productId);
    this.saveToStorage(); 
  }

  calculateTotal() {
    return this.items.reduce((total, item) => total + (item.product.price * item.quantity), 0);
  }

  get totalItems() {
    return this.items.reduce((count, item) => count + item.quantity, 0);
  }

  clear() {
    this.items = [];
    this.saveToStorage(); 
  }

  calculateTotalWithoutVAT(vatPercent = 22) { 
    return this.calculateTotal() / (1 + vatPercent / 100);
  }

  calculateTotalVAT(vatPercent = 22) {
    return this.calculateTotal() - this.calculateTotalWithoutVAT(vatPercent);
  }
}
export const cartConstructor = new Cart();