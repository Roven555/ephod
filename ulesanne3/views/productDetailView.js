export const displayProductDetailView = (product) => {
    const container = document.getElementById("main-container");
    if (!container || !product) return;
    
    container.innerHTML = "";

    const productCard = document.createElement("div");
    productCard.classList.add("product-detail");

    productCard.innerHTML = `
        <div class="product-detail-wrapper">
            <img src="${product.image}" alt="${product.title}" style="width:300px; height:auto; display:block; margin-bottom:1rem;">
            <h2>${product.title}</h2>
            <p><strong>Kategooria:</strong> ${product.category}</p>
            <p><strong>Kirjeldus:</strong> ${product.description}</p>
            <p><strong>Hind:</strong> ${product.price.toFixed(2)} €</p>
            <p><strong>Hinnang:</strong> ${product.rating ? product.rating.rate : 'N/A'} (${product.rating ? product.rating.count : 0} arvustust)</p>
            <button id="back-btn" style="margin-top:1rem; cursor:pointer; padding:10px 20px;">Tagasi poodi</button>
        </div>
    `;

    const backBtn = productCard.querySelector("#back-btn");
    backBtn.onclick = () => {
        window.location.hash = "/";
    };

    container.append(productCard);
};