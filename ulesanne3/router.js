import { displayFavoritesView } from "./views/favoritesView.js";
import { displayProductDetailView } from "./views/productDetailView.js";
import { displayCartView } from "./views/cartView.js";
import { displayAllProductView } from "./views/allProductsView.js";

export const navigate = (view, param) => {
  const views = {
    allProducts: () => displayAllProductView(param || "all"), // Kasuta vaikeväärtust "all" kategooriana
    productDetail: () => displayProductDetailView(param), // üks toode
    cart: () => displayCartView(), // Näita ostukorvi vaadet
    favorites: () => displayFavoritesView(),
  };

  //Vali ja käivita sobiv vaade
  if (views[view]) {
    views[view](); 

     }
};