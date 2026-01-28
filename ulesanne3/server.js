import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import fs from "fs/promises";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 8000;

app.use(express.json()); 
app.use(express.static(__dirname));

const PRODUCTS_PATH = path.join(__dirname, "data", "products.json");
const FAVS_PATH = path.join(__dirname, "data", "favorites.json");


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
    const data = await fs.readFile(PRODUCTS_PATH, "utf-8");
    res.status(200).json(JSON.parse(data));
  } catch (err) { res.status(404).json([]); }
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
    await fs.writeFile(FAVS_PATH, JSON.stringify(favs, null, 2));
  }
  res.status(201).json(favs[userId]);
});

app.delete("/api/favorites/:userId/:productId", async (req, res) => {
  const { userId, productId } = req.params;
  const favs = await getFavs();
  
  if (favs[userId]) {
    favs[userId] = favs[userId].filter(id => id !== productId);
    await fs.writeFile(FAVS_PATH, JSON.stringify(favs, null, 2));
  }
  res.status(200).json(favs[userId]);
});

app.listen(PORT, () => console.log(`http://localhost:${PORT}`));