import { Product } from "./product.js";
import { Cart } from "./Cart.js";
import { Customer } from "./customer.js";

const laptop = new Product(1, "Sülearvuti", 999.99, "Elektroonika");
const phone = new Product(2, "Telefon", 599.99, "Elektroonika");

const cart = new Cart();
cart.addProduct(laptop, 1);
cart.addProduct(phone, 2);

console.log("Kogusumma:", cart.calculateTotal());
console.log("Kokku tooteid ostukorvis:", cart.totalItems);

const customer = new Customer("Alice");
customer.placeOrder(cart);

customer.printOrderHistory();
