import { customerConstructor } from "../constructors/Customer.js";
import { cartConstructor } from "../constructors/Cart.js";
import { updateCartCount } from "../main.js";

export const displayFavoritesView = () => {
    
    const container = document.getElementById("all-products-view");
    if (!container) return;

    container.innerHTML = "<h2 style='padding: 20px;'>Sinu lemmikud</h2>";
    

    const favorites = customerConstructor.getAllFavorites();

    if (!favorites || favorites.length === 0) {
        container.innerHTML += "<p style='padding: 20px;'>Lemmikuid veel pole.</p>";
        return;
    }

    const list = document.createElement("div");
    list.style = "display: grid; grid-template-columns: repeat(auto-fill, minmax(200px, 1fr)); gap: 20px; padding: 20px;";

    favorites.forEach(fav => {
       
        const product = fav.product; 
        if (!product) return;

        const item = document.createElement("div");
        item.style = "border: 1px solid #ddd; padding: 15px; border-radius: 8px; text-align: center; background: white;";
        
        item.innerHTML = `
            <img src="${product.image}" style="height: 120px; object-fit: contain; margin-bottom: 10px;">
            <p style="font-weight: bold; margin: 10px 0; height: 40px; overflow: hidden;">${product.title}</p>
            <p style="color: #28a745; font-weight: bold;">${product.price.toFixed(2)} €</p>
            <div style="display: flex; flex-direction: column; gap: 5px; margin-top: 10px;">
                <button class="add-to-cart-from-fav" style="background: #28a745; color: white; border: none; padding: 8px; cursor: pointer; border-radius: 4px;">Lisa korvi</button>
                <button class="remove-fav" style="background: #eee; color: #ff4757; border: 1px solid #ff4757; padding: 8px; cursor: pointer; border-radius: 4px;">Eemalda</button>
            </div>
        `;

        item.querySelector(".add-to-cart-from-fav").onclick = () => {
            cartConstructor.addProduct(product);
            updateCartCount();
            alert("Toode lisatud ostukorvi!");
        };

        item.querySelector(".remove-fav").onclick = () => {
            customerConstructor.toggleFavorites(product);
            displayFavoritesView(); 
        };

        list.appendChild(item);
    });

    container.appendChild(list);
};