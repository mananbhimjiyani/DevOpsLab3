const express = require('express');
const app = express();
app.use(express.json());

let orders = [];

app.get('/orders', (req, res) => res.json(orders));

app.post('/orders', (req, res) => {
  const order = { id: orders.length + 1, ...req.body };
  orders.push(order);
  res.json(order);
});

app.listen(3002, () => console.log('Order service running on 3002'));