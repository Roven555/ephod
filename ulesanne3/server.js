import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs/promises';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 8000;

app.use(express.static(__dirname));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.get('/api/products', async (req, res) => {
  try {
    // See rida otsib nüüd ulesanne3/data/products.json faili
    const dataPath = path.join(__dirname, 'data', 'products.json');
    const data = await fs.readFile(dataPath, 'utf-8');
    res.json(JSON.parse(data));
  } catch (err) {
    res.status(404).json([]); 
  }
});

app.listen(PORT, () => {
  console.log(`http://localhost:${PORT}`);
});