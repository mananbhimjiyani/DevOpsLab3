const express = require('express');
const app = express();
const port = 3003;

app.post('/payments', (req, res) => {
  // In a real app, use a secret API key here
  res.json({ status: 'Payment successful', transactionId: '12345' });
});

app.listen(port, () => {
  console.log(`Payment Service running on port ${port}`);
});
