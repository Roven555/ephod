import { Order } from "./Order.js";
import { addFavorite, deleteFavorite } from "../api.js"; 

export class Customer {
  constructor(name) {
    this.name = name;
    this.orderHistory = [];
    this.favorites = [];
  }

  async toggleFavorites(product, userId) {
    const idx = this.favorites.findIndex(
      (it) => it.product && it.product.id === product.id
    );

    if (idx === -1) {
      this.favorites.push({ product });
      await addFavorite(userId, product.id); 
    } else {
      this.favorites.splice(idx, 1);
      await deleteFavorite(userId, product.id); 
    }
  }

  getAllFavorites() {
    return this.favorites;
  }

  getFavorites() {
    return this.getAllFavorites();
  }
  
  setFavorites(favoritesArray) {
    this.favorites = favoritesArray.map(product => ({ product }));
  }
}

export const customerConstructor = new Customer("Alice");