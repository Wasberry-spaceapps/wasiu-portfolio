const express = require('express');
const app = express();
app.use(express.json());

// Mock product database
const products = [
  {id: 1, name: "Lavender Tea", price: 12.99, stock: 50},
  {id: 2, name: "Chamomile Balm", price: 18.50, stock: 30}
];

// Simulate fetching from external source
app.get('/api/products', (req, res) => {
  res.json({success: true, data: products});
});

// Simulate pushing to Wix
app.post('/api/sync-to-wix', (req, res) => {
  console.log('Syncing to Wix:', req.body);
  res.json({success: true, synced: req.body.products.length});
});

app.listen(3000, () => console.log('✓ Wix sync API running on 3000'));