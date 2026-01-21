// js/views/cartView.js
import { cartConstructor } from "../constructors/Cart.js";

export const displayCartView = () => {
    const container = document.getElementById("main-container"); // Kasutame peamist konteinerit
    if (!container) return;

    container.innerHTML = "<h2>Ostukorv</h2>";
    const items = cartConstructor.items;

    if (items.length === 0) {
        container.innerHTML += "<p>Ostukorv on tühi.</p>";
        return;
    }

    const table = document.createElement("div");
    items.forEach(item => {
        const row = document.createElement("div");
        row.style = "display: flex; justify-content: space-between; border-bottom: 1px solid #eee; padding: 10px;";
        row.innerHTML = `
            <span>${item.product.title}</span>
            <div>
                <button class="minus" data-id="${item.product.id}">-</button>
                <span>${item.quantity}</span>
                <button class="plus" data-id="${item.product.id}">+</button>
            </div>
            <span>${(item.product.price * item.quantity).toFixed(2)} €</span>
            <button class="remove" data-id="${item.product.id}">Eemalda</button>
        `;

        row.querySelector(".minus").onclick = () => {
            cartConstructor.updateProductQuantity(item.product.id, -1);
            updateCartUI();
        };
        row.querySelector(".plus").onclick = () => {
            cartConstructor.updateProductQuantity(item.product.id, 1);
            updateCartUI();
        };
        row.querySelector(".remove").onclick = () => {
            cartConstructor.removeProduct(item.product.id);
            updateCartUI();
        };
        table.appendChild(row);
    });

    const summary = document.createElement("div");
    summary.innerHTML = `
        <div style="margin-top: 20px; background: #f9f9f9; padding: 15px;">
            <p>Summa ilma KM-ta: ${cartConstructor.calculateTotalWithoutVAT().toFixed(2)} €</p>
            <p>Käibemaks (22%): ${cartConstructor.calculateTotalVAT().toFixed(2)} €</p>
            <h3>Kokku: ${cartConstructor.calculateTotal().toFixed(2)} €</h3>
            <button id="clear-cart">Tühista ostukorv</button>
            <button id="buy-btn">Osta</button>
        </div>
    `;

    summary.querySelector("#clear-cart").onclick = () => {
        cartConstructor.clear();
        updateCartUI();
    };

    container.appendChild(table);
    container.appendChild(summary);
};

const updateCartUI = () => {
    displayCartView();
    document.getElementById("cart-count").innerText = cartConstructor.totalItems;
};