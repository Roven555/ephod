export const displayAllProductView = (products, categories, onCategoryClick) => {
    const mainContainer = document.querySelector("#all-products-view");
    if (!mainContainer) return;

    mainContainer.innerHTML = `
        <div class="category-filters" style="margin-bottom: 20px; display: flex; gap: 10px; flex-wrap: wrap;"></div>
        <div class="products-container" style="display: grid; grid-template-columns: repeat(auto-fill, minmax(200px, 1fr)); gap: 20px;"></div>
    `;

    const filterContainer = mainContainer.querySelector(".category-filters");
    const productsContainer = mainContainer.querySelector(".products-container");

    const allBtn = document.createElement("button");
    allBtn.innerText = "Kõik";
    allBtn.style.padding = "8px 16px";
    allBtn.style.cursor = "pointer";
    allBtn.onclick = () => onCategoryClick("Kõik");
    filterContainer.appendChild(allBtn);

    categories.forEach(category => {
        const btn = document.createElement("button");
        btn.innerText = category.charAt(0).toUpperCase() + category.slice(1);
        btn.style.padding = "8px 16px";
        btn.style.cursor = "pointer";
        btn.onclick = () => onCategoryClick(category);
        filterContainer.appendChild(btn);
    });

    products.forEach((product) => {
        const productCard = document.createElement("div");
        productCard.className = "product-card";
        productCard.style.border = "1px solid #ccc";
        productCard.style.padding = "15px";
        productCard.style.borderRadius = "8px";

        productCard.innerHTML = `
            <img src="${product.image || ''}" alt="${product.title}" style="width: 100%; height: 150px; object-fit: contain; margin-bottom: 10px;">
            <h3 class="product-title" style="cursor:pointer; font-size: 1.1rem; margin: 10px 0;">${product.title}</h3>
            <p>Kategooria: ${product.category}</p>
            <p><strong>Hind: ${product.price.toFixed(2)} €</strong></p>
            <button class="add-to-cart-btn" style="width: 100%; padding: 10px; margin-top: 10px; cursor: pointer;">Lisa ostukorvi</button>
        `;

        productCard.querySelector(".product-title").onclick = () => {
            window.location.hash = `/product/${product.id}`;
        };

        productsContainer.appendChild(productCard);
    });
};