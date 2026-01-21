import { cartConstructor } from "./constructors/Cart.js";
import { customerConstructor } from "./customerConstructor.js"; 
import { Product } from "./constructors/Product.js";
import { displayAllProductView } from "./views/allProductsView.js";
import { displayCartView } from "./views/cartView.js";
import { displayFavoritesView } from "./views/favoritesView.js";
import { displayProductDetailView } from "./views/productDetailView.js";
import { fetchProducts, fetchCategories, fetchProductById } from "./api.js";

const initApp = async () => {
  const rawData = await fetchProducts();
  const categories = await fetchCategories();

  const products = rawData.map(p => new Product(
    p.id, 
    p.title, 
    p.price, 
    p.category, 
    p.description, 
    p.image, 
    p.rating
  ));

  const handleCategoryClick = (category) => {
    if (category === "Kõik") {
      displayAllProductView(products, categories, handleCategoryClick);
    } else {
      const filtered = products.filter(p => p.category === category);
      displayAllProductView(filtered, categories, handleCategoryClick);
    }
  };

  displayAllProductView(products, categories, handleCategoryClick);
  displayCartView();
  displayFavoritesView();
};

window.addEventListener("hashchange", async () => {
  const hash = window.location.hash;
  if (hash.startsWith("#/product/")) {
    const id = hash.split("/").pop();
    const p = await fetchProductById(id);
    if (p) {
      const product = new Product(p.id, p.title, p.price, p.category, p.description, p.image, p.rating);
      displayProductDetailView(product);
    }
  } else if (hash === "#/" || hash === "") {
    initApp();
  }
});

document.addEventListener("DOMContentLoaded", () => {
  if (window.location.hash.startsWith("#/product/")) {
    window.dispatchEvent(new HashChangeEvent("hashchange"));
  } else {
    initApp();
  }
});