import { cartConstructor } from "./constructors/Cart.js";
import { customerConstructor } from "./constructors/Customer.js";
import { Product } from "./constructors/Product.js";
import { displayAllProductView } from "./views/allProductsView.js";
import { displayCartView } from "./views/cartView.js";
import { displayFavoritesView } from "./views/favoritesView.js";
import { displayProductDetailView } from "./views/productDetailView.js";
import { fetchProducts } from "./api.js";

const initApp = async () => {
  const rawData = await fetchProducts();

  const products = rawData.map(p => new Product(p.id, p.title, p.price, p.category));

  console.log("Kõik tooted kätte saadud ja muudetud Product objektideks:");
  console.table(products);

  if (products.length > 0) {
    cartConstructor.addProduct(products[0], 2);
    customerConstructor.toggleFavorites(products[0]);
    
    displayAllProductView(products);
    
    if (products[1]) {
      displayProductDetailView(products[1]);
    }
  }

  displayCartView();
  displayFavoritesView();
};

document.addEventListener("DOMContentLoaded", initApp);