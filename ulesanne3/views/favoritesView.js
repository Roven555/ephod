import { customerConstructor } from "../constructors/Customer.js";
import { cartConstructor } from "../constructors/Cart.js";

export const displayFavoritesView = () => {
    const container = document.getElementById("favorites-container");
    if (!container) return;

    container.innerHTML = "<h2>Lemmikud</h2>";
    const favorites = customerConstructor.getFavorites();

    if (favorites.length === 0) {
        container.innerHTML += "<p>Lemmikuid veel pole.</p>";
        return;
    }

    const list = document.createElement("div");
    list.className = "favorites-list";
    list.style = "display: grid; grid-template-columns: repeat(auto-fill, minmax(200px, 1fr)); gap: 20px;";

    favorites.forEach(product => {
        const item = document.createElement("div");
        item.className = "favorite-item";
        item.style = "border: 1px solid #ddd; padding: 10px; border-radius: 8px; text-align: center;";
        
        item.innerHTML = `
            <img src="${product.image}" style="height: 100px; object-fit: contain;">
            <p style="font-weight: bold; margin: 10px 0;">${product.title}</p>
            <p>${product.price.toFixed(2)} €</p>
            <button class="add-to-cart-from-fav" style="background: #28a745; color: white; border: none; padding: 5px 10px; cursor: pointer;">Lisa korvi</button>
            <button class="remove-fav" style="background: #ff4757; color: white; border: none; padding: 5px 10px; cursor: pointer;">Eemalda</button>
        `;

        item.querySelector(".add-to-cart-from-fav").onclick = () => {
            cartConstructor.addProduct(product);
            document.getElementById("cart-count").innerText = cartConstructor.totalItems;
        };

        item.querySelector(".remove-fav").onclick = () => {
            customerConstructor.removeFavorite(product.id);
            displayFavoritesView();
        };

        list.appendChild(item);
    });

    container.appendChild(list);
};