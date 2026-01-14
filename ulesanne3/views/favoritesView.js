import { customerConstructor } from "../constructors/Customer.js";

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

    favorites.forEach(product => {
        const item = document.createElement("div");
        item.className = "favorite-item";
        item.innerHTML = `<span>${product.name}</span>`;
        list.appendChild(item);
    });

    container.appendChild(list);
};