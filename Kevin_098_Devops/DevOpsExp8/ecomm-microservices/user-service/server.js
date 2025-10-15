const express = require('express');
const app = express();
const port = 3000;

app.get('/users/:id', (req, res) => {
  res.json({ id: req.params.id, name: 'User ' + req.params.id });
});

app.listen(port, () => {
  console.log(`User Service running on port ${port}`);
});
