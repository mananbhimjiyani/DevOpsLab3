const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

app.get('/hello', (req, res) => {
  res.send('Congratulations!!! you have created your first CICD pipeline using Jenkins.\n');
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
