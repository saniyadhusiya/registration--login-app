import React, { useState } from "react";
import axios from "axios";

function RegistrationForm() {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    age: "",
    mobile: "",
    gender: "",
    email: ""
  });

  // handle input change
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  // handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    // ✅ DEBUG: form data check
    console.log("FORM DATA:", form);

    try {
      await axios.post(
        "http://localhost:5000/api/users/register",
        form
      );

      alert("User registered successfully\nPlease check your email for login details.");

      // optional: clear form after success
      setForm({
        firstName: "",
        lastName: "",
        age: "",
        mobile: "",
        gender: "",
        email: ""
      });
    } catch (err) {
      console.error("Registration Error:", err);
      alert("Registration Failed");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="form-box">
      <input
        type="text"
        name="firstName"
        placeholder="First Name"
        value={form.firstName}
        onChange={handleChange}
        required
      />

      <input
        type="text"
        name="lastName"
        placeholder="Last Name"
        value={form.lastName}
        onChange={handleChange}
        required
      />

      <input
        type="number"
        name="age"
        placeholder="Age"
        value={form.age}
        onChange={handleChange}
        required
      />

      <input
        type="text"
        name="mobile"
        placeholder="Mobile Number"
        value={form.mobile}
        onChange={handleChange}
        required
      />

      <select
        name="gender"
        value={form.gender}
        onChange={handleChange}
        required
      >
        <option value="">Select Gender</option>
        <option value="Male">Male</option>
        <option value="Female">Female</option>
      </select>

      <input
        type="email"
        name="email"
        placeholder="Email Address"
        value={form.email}
        onChange={handleChange}
        required
      />

      <button type="submit">Register</button>
    </form>
  );
}

export default RegistrationForm;
