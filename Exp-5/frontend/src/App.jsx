import React, { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch("http://localhost:9090/users")
      .then((res) => res.json())
      .then((data) => setUsers(data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="container">
      <h1>User List</h1>
      <div className="card-grid">
        {users.map((user) => (
          <div className="card" key={user.id}>
            <img
              src={`https://picsum.photos/200?random=${user.id}`}
              alt="User Avatar"
              className="user-img"
            />
            <h2>{user.name}</h2>
            <p>{user.email}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
