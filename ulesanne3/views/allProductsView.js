export const displayAllProductView = (products) => {
    const container = document.querySelector("#all-products-view .products-container");

    if (!container) return;

    container.innerHTML = "";

    products.forEach((product) => {
        const productCard = document.createElement("div");
        productCard.className = "product-card";

        productCard.innerHTML = `
            <h3>${product.name}</h3>
            <p>Kategooria: ${product.category}</p>
            <p><strong>Hind: ${product.price.toFixed(2)} €</strong></p>
            <button class="add-to-cart-btn">Lisa ostukorvi</button>
        `;

        const button = productCard.querySelector(".add-to-cart-btn");
        button.onclick = () => {
            console.log(`Toode ${product.name} lisatud ostukorvi`);
        };

        container.appendChild(productCard);
    });
};