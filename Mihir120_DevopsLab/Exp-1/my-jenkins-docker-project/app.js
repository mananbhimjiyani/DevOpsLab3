const http = require('http');
const port = 3000;
const server = http.createServer((req, res) => {
    res.end("Hello from my custom Jenkins + Docker project!");
});
server.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
