import { useEffect, useState } from "react";
import api from "../api";

export default function UsersPage() {

  const [users, setUsers] = useState([]);

  const [form, setForm] = useState({
    name: "",
    email: "",
    address: "",
    phone: "",
    password: "",
  });

  const fetchusers = async () => {
    const res = await api.get("/users");
    setUsers(res.data);
  };

  useEffect(() => {
    fetchusers();
  }, []);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const createUser = async () => {
    await api.post("/users", form);

    setForm({
      name: "",
      email: "",
      phone: "",
      address: "",
      password: "",
    });

    fetchusers();
  };

  const deleteUser = async (id) => {
    await api.delete(`/users/${id}`);
    fetchusers();
  };

  return (
    <>
      <div>
        <h1>Users</h1>

        <input
          type="text"
          name="name"
          placeholder="name"
          value={form.name}
          onChange={handleChange}
        />

        <input
          type="text"
          name="email"
          placeholder="email"
          value={form.email}
          onChange={handleChange}
        />

        <input
          type="text"
          name="phone"
          placeholder="phone"
          value={form.phone}
          onChange={handleChange}
        />

        <input
          type="text"
          name="address"
          placeholder="address"
          value={form.address}
          onChange={handleChange}
        />

        <input
          type="password"
          name="password"
          placeholder="password"
          value={form.password}
          onChange={handleChange}
        />

        <button onClick={createUser}>
          Add User
        </button>
      </div>

      {users.map((user) => (
        <div key={user._id}>
          <p>{user.name}</p>
          <p>{user.email}</p>
          <p>{user.address}</p>

          <button
            onClick={() => deleteUser(user._id)}
          >
            Delete
          </button>
        </div>
      ))}
    </>
  );
}