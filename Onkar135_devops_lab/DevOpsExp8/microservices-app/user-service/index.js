const express = require('express');
const app = express();
app.use(express.json());

let users = [
  { id: 1, name: 'Alice' },
  { id: 2, name: 'Bob' },
];

app.get('/users', (req, res) => res.json(users));

app.listen(3003, () => console.log('User service running on 3003'));
