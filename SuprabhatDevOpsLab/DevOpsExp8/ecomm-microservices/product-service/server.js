const express = require('express');
const app = express();
const port = 3001;

app.get('/products/:id', (req, res) => {
  res.json({ id: req.params.id, name: 'Product ' + req.params.id, price: 100 });
});

app.listen(port, () => {
  console.log(`Product Service running on port ${port}`);
});
