import { useEffect, useState } from "react";
import { User } from "./types/User";

const App = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((res) => res.json())
      .then((data: User[]) => {
        setUsers(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching users:", error);
        setLoading(false);
      });
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h1>User List</h1>
      {loading ? (
        <p>Loading...</p>
      ) : (
        users.map((user) => (
          <div key={user.id} style={{ border: "1px solid #ccc", padding: "10px", marginBottom: "10px" }}>
            <h3>{user.name}</h3>
            <p>Email: {user.email}</p>
            <p>City: {user.address.city}</p>
          </div>
        ))
      )}
    </div>
  );
};

export default App;
