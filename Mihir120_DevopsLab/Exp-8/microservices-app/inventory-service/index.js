const express = require('express');
const app = express();
app.use(express.json());

let inventory = [
  { id: 1, productId: 1, quantity: 50 },
  { id: 2, productId: 2, quantity: 20 },
];

app.get('/inventory', (req, res) => res.json(inventory));

app.listen(3004, () => console.log('Inventory service running on 3004'));
