import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import fs from "fs/promises";
import axios from "axios";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 8000;

app.use(express.json());
app.use(express.static(__dirname));

const PRODUCTS_PATH = path.join(__dirname, "data", "products.json");
const FAVS_PATH = path.join(__dirname, "data", "favorites.json");

const fetchAndSaveProducts = async () => {
  try {
    const response = await axios.get('https://fakestoreapi.com/products');
    await fs.mkdir(path.dirname(PRODUCTS_PATH), { recursive: true });
    await fs.writeFile(PRODUCTS_PATH, JSON.stringify(response.data, null, 2));
    console.log("Andmed FakeStore API-st salvestatud.");
    return response.data;
  } catch (error) {
    console.error("API viga:", error.message);
    return [];
  }
};

const getFavs = async () => {
  try {
    const data = await fs.readFile(FAVS_PATH, "utf-8");
    return JSON.parse(data);
  } catch {
    return {};
  }
};

app.get("/api/products", async (req, res) => {
  try {
    try {
      await fs.access(PRODUCTS_PATH);
      const data = await fs.readFile(PRODUCTS_PATH, "utf-8");
      if (data.trim().length < 5) throw new Error("Tühi");
      res.status(200).json(JSON.parse(data));
    } catch {
      const products = await fetchAndSaveProducts();
      res.status(200).json(products);
    }
  } catch (err) {
    res.status(500).json([]);
  }
});

app.get("/api/categories", async (req, res) => {
  try {
    const data = await fs.readFile(PRODUCTS_PATH, "utf-8");
    const products = JSON.parse(data);
    const categories = ["Kõik", ...new Set(products.map((p) => p.category))];
    res.status(200).json(categories);
  } catch (err) {
    res.status(404).json(["Kõik"]);
  }
});

app.get("/api/favorites/:userId", async (req, res) => {
  const favs = await getFavs();
  res.json(favs[req.params.userId] || []);
});

app.post("/api/favorites/:userId/:productId", async (req, res) => {
  const { userId, productId } = req.params;
  const favs = await getFavs();
  if (!favs[userId]) favs[userId] = [];
  if (!favs[userId].includes(productId)) {
    favs[userId].push(productId);
    await fs.mkdir(path.dirname(FAVS_PATH), { recursive: true });
    await fs.writeFile(FAVS_PATH, JSON.stringify(favs, null, 2));
  }
  res.status(201).json(favs[userId]);
});

app.delete("/api/favorites/:userId/:productId", async (req, res) => {
  const { userId, productId } = req.params;
  const favs = await getFavs();
  if (favs[userId]) {
    favs[userId] = favs[userId].filter((id) => id !== productId);
    await fs.writeFile(FAVS_PATH, JSON.stringify(favs, null, 2));
  }
  res.status(200).json(favs[userId]);
});

app.use((req, res, next) => {
  if (req.path.startsWith('/api')) return next();
  res.sendFile(path.join(__dirname, "index.html"));
});

app.listen(PORT, () => console.log(`Server: http://localhost:${PORT}`));