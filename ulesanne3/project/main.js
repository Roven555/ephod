import { Product } from "../constructors/Product.js";
import { Cart } from "../constructors/Cart.js";
import { Customer } from "../constructors/Customer.js";
import { displayAllProductView } from "./views/allProductsView.js";

const products = [
    new Product(1, "Sülearvuti", 999.99, "Elektroonika"),
    new Product(2, "Telefon", 599.99, "Elektroonika"),
    new Product(3, "Tahvelarvuti", 260.00, "Elektroonika"),
];

const initApp = async () => {
    displayAllProductView(products);
};

document.addEventListener("DOMContentLoaded", initApp);
