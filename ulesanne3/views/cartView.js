import { cartConstructor } from "../constructors/Cart.js";
import { customerConstructor } from "../constructors/Customer.js";

export const displayCartView = () => {
    // Kasutame täpset ID-d, mis on sinu index.html-is
    const container = document.getElementById("cart-container");
    
    // Kui elementi ei leita, siis funktsioon seiskub ilma veata
    if (!container) return;

    container.innerHTML = "<h2>Ostukorv</h2>";

    const cart = cartConstructor.getAllProducts();

    if (!cart.length) {
        const emptyMessage = document.createElement("p");
        emptyMessage.innerText = "Ostukorv on tühi";
        container.appendChild(emptyMessage);
        return;
    }

    const cartItemsWrapper = document.createElement("div");
    cartItemsWrapper.className = "cart-items-wrapper";

    cart.forEach((item) => {
        const cartItemElement = document.createElement("div");
        cartItemElement.classList.add("cart-item");

        cartItemElement.innerHTML = `
            <h3>${item.product.name}</h3>
            <p>Hind: $${item.product.price}</p>
            <p>Kogus: ${item.quantity}</p>
        `;

        const removeButton = document.createElement("button");
        removeButton.textContent = "Eemalda";
        removeButton.onclick = () => {
            cartConstructor.removeProduct(item.product.id);
            displayCartView();
        };

        cartItemElement.appendChild(removeButton);
        cartItemsWrapper.appendChild(cartItemElement);
    });

    const cartSummaryContainer = document.createElement("div");
    cartSummaryContainer.className = "cart-summary";

    cartSummaryContainer.innerHTML = `
        <h2>Kokkuvõte</h2>
        <div class="summary">
            <p>Toodete hind kokku: ${cartConstructor.calculateTotal().toFixed(2)}€</p>
            <p>Kokku ilma km: ${cartConstructor.calculateTotalWithoutVAT().toFixed(2)}€</p>
            <p>Käibemaks: ${cartConstructor.calculateTotalVAT().toFixed(2)}€</p>
            <p><strong>Lõpphind: ${cartConstructor.calculateTotal().toFixed(2)}€</strong></p>
        </div>
    `;

    const submitButton = document.createElement("button");
    submitButton.textContent = "Osta";
    submitButton.onclick = (e) => {
        e.stopPropagation();
        customerConstructor.placeOrder(cartConstructor);
    };

    const cancelButton = document.createElement("button");
    cancelButton.textContent = "Tühista ostukorv";
    cancelButton.onclick = () => {
        cartConstructor.clear();
        displayCartView();
    };

    cartSummaryContainer.append(submitButton, cancelButton);
    container.append(cartItemsWrapper, cartSummaryContainer);
};