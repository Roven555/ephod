import { addFavorite, deleteFavorite } from "../api.js";

export class Customer {
  constructor(name) {
    this.name = name;
    this.userId = null;
    this.orderHistory = [];
    this.favorites = [];
  }

  setUserId(id) {
    this.userId = id;
  }

  async toggleFavorites(product) {
    if (!this.userId) {
      console.error("Kasutaja ID puudu!");
      return;
    }

    const idx = this.favorites.findIndex(
      (it) => it.product && String(it.product.id) === String(product.id),
    );

    if (idx === -1) {
      this.favorites.push({ product });
      await addFavorite(this.userId, product.id);
    } else {
      this.favorites.splice(idx, 1);
      await deleteFavorite(this.userId, product.id);
    }
  }

  getAllFavorites() {
    return this.favorites;
  }

  setFavorites(favoritesArray) {
    this.favorites = favoritesArray.map((product) => ({ product }));
  }
}

export const customerConstructor = new Customer("Alice");
