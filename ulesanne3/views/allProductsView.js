export const displayAllProductView = (products, categories, onCategoryClick, favorites = [], onFavoriteToggle) => {
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
    allBtn.style = "padding: 8px 16px; cursor: pointer; border: 1px solid #ddd; border-radius: 4px; background: #fff;";
    allBtn.onclick = () => onCategoryClick("Kõik");
    filterContainer.appendChild(allBtn);

    categories.forEach(category => {
        const btn = document.createElement("button");
        btn.innerText = category.charAt(0).toUpperCase() + category.slice(1);
        btn.style = "padding: 8px 16px; cursor: pointer; border: 1px solid #ddd; border-radius: 4px; background: #fff;";
        btn.onclick = () => onCategoryClick(category);
        filterContainer.appendChild(btn);
    });

    products.forEach((product) => {
        const isFavorite = favorites.some(fav => fav.product && fav.product.id === product.id);

        const productCard = document.createElement("div");
        productCard.className = "product-card";
        productCard.style = "border: 1px solid #ccc; padding: 15px; border-radius: 8px; display: flex; flex-direction: column; justify-content: space-between; background: white;";

        productCard.innerHTML = `
            <div>
                <img src="${product.image || ''}" alt="${product.title}" style="width: 100%; height: 150px; object-fit: contain; margin-bottom: 10px;">
                <h3 class="product-title" style="cursor:pointer; font-size: 1rem; margin: 10px 0; color: #007bff;">${product.title}</h3>
                <p style="font-size: 0.8rem; color: #666; text-transform: uppercase;">${product.category}</p>
                <p style="font-size: 1.1rem;"><strong>${product.price.toFixed(2)} €</strong></p>
            </div>
            <div style="display: flex; gap: 5px; margin-top: 10px;">
                <button class="add-to-cart-btn" style="flex: 1; padding: 10px; cursor: pointer; background: #28a745; color: white; border: none; border-radius: 4px; font-weight: bold;">
                    Lisa ostukorvi
                </button>
                <button class="favorite-btn" style="padding: 10px; cursor: pointer; background: ${isFavorite ? '#fff0f0' : '#f8f8f8'}; border: 1px solid ${isFavorite ? '#ff4757' : '#ddd'}; border-radius: 4px; font-size: 1.2rem;">
                    ${isFavorite ? '❤️' : '🤍'}
                </button>
            </div>
        `;

        productCard.querySelector(".product-title").onclick = () => {
            window.location.hash = `#/product/${product.id}`;
        };

        productCard.querySelector(".add-to-cart-btn").onclick = () => {
            import('../constructors/Cart.js').then(m => {
                m.cartConstructor.addProduct(product);
                const cartCount = document.getElementById("cart-count");
                if (cartCount) {
                    cartCount.innerText = m.cartConstructor.totalItems;
                }
            }).catch(err => console.error("Ostukorvi faili ei leitud:", err));
        };

        productCard.querySelector(".favorite-btn").onclick = () => {
            if (onFavoriteToggle) {
                onFavoriteToggle(product);
            }
        };

        productsContainer.appendChild(productCard);
    });
};