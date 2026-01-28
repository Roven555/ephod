import { cartConstructor } from "./constructors/Cart.js";
import { customerConstructor } from "./constructors/Customer.js";
import { displayAllProductView } from "./views/allProductsView.js";
import { displayProductDetailView } from "./views/productDetailView.js";
import { displayCartView } from "./views/cartView.js";
import { displayFavoritesView } from "./views/favoritesView.js";
import {
  fetchProducts,
  fetchCategories,
  fetchProductById,
  getFavoritesByUserId,
} from "./api.js";

const handleFavoriteToggle = async (product) => {
  await customerConstructor.toggleFavorites(product);

  if (window.location.hash === "#/favorites") {
    displayFavoritesView();
  } else {
    renderMainView();
  }
};

const renderMainView = async (filteredProducts = null) => {
  try {
    const rawData = filteredProducts || (await fetchProducts());
    const categories = await fetchCategories();

    if (!Array.isArray(rawData)) {
      console.error("Andmed pole kättesaadavad:", rawData);
      return;
    }

    const currentFavorites = customerConstructor.getAllFavorites();

    displayAllProductView(
      rawData,
      categories,
      handleCategoryClick,
      currentFavorites,
      handleFavoriteToggle,
    );
  } catch (error) {
    console.error("Viga toodete kuvamisel:", error);
  }
};

const handleCategoryClick = async (category) => {
  const allProducts = await fetchProducts();
  if (!Array.isArray(allProducts)) return;

  if (category === "Kõik") {
    renderMainView(allProducts);
  } else {
    const filtered = allProducts.filter((p) => p.category === category);
    renderMainView(filtered);
  }
};

const handleNavigation = async () => {
  const hash = window.location.hash;

  if (hash.startsWith("#/product/")) {
    const id = hash.split("/").pop();
    const product = await fetchProductById(id);
    if (product) {
      const isFav = customerConstructor
        .getAllFavorites()
        .some((f) => f.product && String(f.product.id) === String(product.id));
      displayProductDetailView(product, isFav);
    }
  } else if (hash === "#/cart") {
    displayCartView();
  } else if (hash === "#/favorites") {
    displayFavoritesView();
  } else {
    await renderMainView();
  }
};

const initApp = async () => {
  let userId = sessionStorage.getItem("userId");
  if (!userId) {
    userId = "user_" + Math.random().toString(36).substr(2, 9);
    sessionStorage.setItem("userId", userId);
  }

  customerConstructor.setUserId(userId);

  try {
    const serverFavIds = await getFavoritesByUserId(userId);
    const allProducts = await fetchProducts();

    const favProducts = allProducts.filter((p) =>
      serverFavIds.map(String).includes(String(p.id)),
    );

    customerConstructor.setFavorites(favProducts);
  } catch (error) {
    console.error("Viga lemmikute taastamisel:", error);
  }

  const cartBtn = document.getElementById("cart-button");
  if (cartBtn) cartBtn.onclick = () => (window.location.hash = "#/cart");

  const favBtn = document.getElementById("favorites-button");
  if (favBtn) favBtn.onclick = () => (window.location.hash = "#/favorites");

  const logo = document.querySelector(".header h1") || document.querySelector("h1");
  if (logo) {
    logo.onclick = () => { window.location.hash = ""; };
    logo.style.cursor = "pointer";
  }

  window.addEventListener("hashchange", handleNavigation);
  await handleNavigation();
  updateCartCount();
};

export const updateCartCount = () => {
  const cartCount = document.getElementById("cart-count");
  if (cartCount) {
    cartCount.innerText = cartConstructor.totalItems;
  }
};

initApp();