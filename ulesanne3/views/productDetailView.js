import { cartConstructor } from "../constructors/Cart.js";
import { customerConstructor } from "../constructors/Customer.js";
import { updateCartCount } from "../main.js";

export const displayProductDetailView = (product, isFavorite = false) => {
    const container = document.getElementById("all-products-view"); // Kasutame õiget konteinerit
    if (!container || !product) return;
    
    container.innerHTML = "";

    const detailSection = document.createElement("div");
    detailSection.className = "view-section";
    detailSection.innerHTML = `
        <div style="display: flex; gap: 40px; align-items: start; padding: 20px; background: white; border-radius: 8px;">
            <img src="${product.image}" alt="${product.title}" style="width:300px; height:auto; border: 1px solid #eee; padding: 10px;">
            <div style="max-width: 500px;">
                <button id="back-btn" style="margin-bottom: 20px; cursor:pointer; padding: 5px 15px;">← Tagasi poodi</button>
                <h2 style="margin-top: 0;">${product.title}</h2>
                <p><strong>Kategooria:</strong> ${product.category}</p>
                <p><strong>Kirjeldus:</strong> ${product.description}</p>
                <p style="font-size: 2rem; color: #28a745;"><strong>${product.price.toFixed(2)} €</strong></p>
                
                <div style="display: flex; gap: 10px; margin-top: 20px;">
                    <button id="detail-add-cart" style="padding: 15px 30px; background: #28a745; color: white; border: none; border-radius: 5px; cursor: pointer; font-weight: bold; flex: 1;">
                        Lisa ostukorvi
                    </button>
                    <button id="detail-favorite" style="padding: 15px; background: ${isFavorite ? '#ff4757' : '#eee'}; color: ${isFavorite ? 'white' : 'black'}; border: 1px solid #ccc; border-radius: 5px; cursor: pointer;">
                        ${isFavorite ? '❤️ Lemmikutes' : '🤍 Lisa lemmikutesse'}
                    </button>
                </div>
            </div>
        </div>
    `;
    detailSection.querySelector("#back-btn").onclick = () => {
        window.location.hash = "";
    };
    
    detailSection.querySelector("#detail-add-cart").onclick = () => {
        cartConstructor.addProduct(product);
        updateCartCount();
        alert("Toode lisatud ostukorvi!");
    };

    detailSection.querySelector("#detail-favorite").onclick = () => {
        customerConstructor.toggleFavorites(product);
        const nowFavorite = customerConstructor.getAllFavorites().some(f => f.product && f.product.id === product.id);
        displayProductDetailView(product, nowFavorite);
    };

    container.appendChild(detailSection);
};