import { Product } from "./ulesanne3/constructors/Product.js";
import { Cart } from "./ulesanne3/constructors/Cart.js";
import { Customer } from "./ulesanne3/constructors/Customer.js";
import { displayAllProductView } from "./views/allProductsView.js";
import products from "./data/products.js";

displayAllProductView(products);



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
