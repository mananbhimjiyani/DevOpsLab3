const express = require('express');
const app = express();
app.use(express.json());

let products = [
  { id: 1, name: 'Product A', price: 100 },
  { id: 2, name: 'Product B', price: 200 },
];

app.get('/products', (req, res) => res.json(products));

app.post('/products', (req, res) => {
  const product = { id: products.length + 1, ...req.body };
  products.push(product);
  res.json(product);
});

app.listen(3001, () => console.log('Product service running on 3001'));
