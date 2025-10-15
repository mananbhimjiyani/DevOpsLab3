const express = require('express');
const axios = require('axios');
const app = express();
const port = 3002;

app.get('/orders/:id', async (req, res) => {
  try {
    const user = await axios.get('http://user-service:3000/users/' + req.params.id);
    const product = await axios.get('http://product-service:3001/products/' + req.params.id);
    res.json({ orderId: req.params.id, user: user.data, product: product.data });
  } catch (error) {
    res.status(500).send('Error fetching data');
  }
});

app.listen(port, () => {
  console.log(`Order Service running on port ${port}`);
});