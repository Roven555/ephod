export const displayAllProductView = (products) => {
    const container = document.getElementById("main-container");

    container.innerHTML = "<h2>Tooted</h2>";

    const productsContainer = document.createElement("div");
    productsContainer.classList.add("products-container");

    products.forEach( (product)) => {
        const productCard = document.createElement("div");
        productCard.classList.add("product");
        productCard.innerHTML = `
        <h3>${product.name}</h3>
        
        `
    }


}

