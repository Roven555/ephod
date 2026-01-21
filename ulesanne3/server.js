import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import fs from "fs/promises";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 8000;

app.use(express.static(__dirname));

const getProductsData = async () => {
  const dataPath = path.join(__dirname, "data", "products.json");
  const data = await fs.readFile(dataPath, "utf-8");
  return JSON.parse(data);
};

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

app.get("/api/products", async (req, res) => {
  try {
    const products = await getProductsData();
    res.status(200).json(products);
  } catch (err) {
    res.status(404).json([]);
  }
});

app.get("/api/products/:id", async (req, res) => {
  try {
    const products = await getProductsData();
    const product = products.find((p) => p.id === parseInt(req.params.id));
    if (product) {
      res.status(200).json(product);
    } else {
      res.status(404).send("Cannot GET /api/products/" + req.params.id);
    }
  } catch (err) {
    res.status(500).json(null);
  }
});

app.get("/api/categories", async (req, res) => {
  try {
    const products = await getProductsData();
    const categories = [...new Set(products.map((p) => p.category))];
    res.status(200).json(categories);
  } catch (err) {
    res.status(404).json([]);
  }
});

app.listen(PORT, () => {
  console.log(`http://localhost:${PORT}`);
});