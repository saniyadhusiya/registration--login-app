import React, { useState } from "react";
import axios from "axios";

function LoginForm({ onLoginSuccess }) {
  const [form, setForm] = useState({
    userId: "",
    password: ""
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        "http://localhost:5000/api/users/login",
        form
      );

      alert("Login successful");

      //  Pass admin status to App.js
      onLoginSuccess(res.data.isAdmin);

    } catch (err) {
      alert("Invalid credentials ❌");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="form-box">
      <input
        type="text"
        name="userId"
        placeholder="User ID"
        value={form.userId}
        onChange={handleChange}
        required
      />

      <input
        type="password"
        name="password"
        placeholder="Password"
        value={form.password}
        onChange={handleChange}
        required
      />

      <button type="submit">Login</button>
    </form>
  );
}

export default LoginForm;
