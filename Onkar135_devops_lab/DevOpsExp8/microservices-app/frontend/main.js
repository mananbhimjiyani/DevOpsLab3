async function fetchProducts() {
  const res = await fetch('http://localhost:3001/products');
  const data = await res.json();
  document.getElementById('products').innerHTML = `<h2>Products</h2><pre>${JSON.stringify(data, null, 2)}</pre>`;
}

async function fetchOrders() {
  const res = await fetch('http://localhost:3002/orders');
  const data = await res.json();
  document.getElementById('orders').innerHTML = `<h2>Orders</h2><pre>${JSON.stringify(data, null, 2)}</pre>`;
}

fetchProducts();
fetchOrders();
