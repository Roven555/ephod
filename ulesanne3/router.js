import { displayFavoritesView } from "./views/favoritesView.js";
import { displayProductDetailView } from "./views/productDetailView.js";
import { displayCartView } from "./views/cartView.js";
import { displayAllProductView } from "./views/allProductsView.js";

export const navigate = (view, param) => {
  const views = {
    allProducts: () => displayAllProductView(param || "all"), 
    productDetail: () => displayProductDetailView(param), 
    cart: () => displayCartView(), 
    favorites: () => displayFavoritesView(),
  };

  if (views[view]) {
    views[view](); 

     }
};