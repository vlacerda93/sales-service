const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// Mocked sales
const sales = [
  { id: 1, itemName: 'Laptop', amount: 1500, date: '2026-07-01' },
  { id: 2, itemName: 'Mouse', amount: 25, date: '2026-07-02' },
  { id: 3, itemName: 'Keyboard', amount: 100, date: '2026-07-03' }
];

app.get('/sales', (req, res) => {
  res.json({ sales });
});

app.post('/sales', (req, res) => {
  const { itemName, amount } = req.body;
  
  if (!itemName || amount === undefined) {
    return res.status(400).json({ error: 'itemName and amount are required' });
  }

  const newSale = {
    id: sales.length > 0 ? sales[sales.length - 1].id + 1 : 1,
    itemName,
    amount,
    date: new Date().toISOString().split('T')[0] // yyyy-mm-dd
  };

  sales.push(newSale);
  res.status(201).json({ message: 'Sale recorded successfully', sale: newSale });
});

module.exports = app;
