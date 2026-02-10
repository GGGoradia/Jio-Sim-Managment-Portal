import React, { useState } from "react";
import "@/css/Navbar.css";
import "@/css/AdminUserRegistration.css";
import axios from "axios";

const AdminUserRegistration = () => {
  const [showRegister, setShowRegister] = useState(false);
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "",
  });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

const handleSubmit = async (e) => {
  e.preventDefault();

  if (form.password !== form.confirmPassword) {
    setError("Passwords do not match");
    return;
  }

  try {
    const response = await axios.post(
      "http://10.145.52.5:5003/api/pkisim2.1/users/insert", 
      {
        username: form.username,
        email: form.email,
        password: form.password,
        role: form.role === "USER" ? "ENDUSER" : form.role,
        account_status: "ACTIVE"
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  
    alert("Registration successful");
  } catch (err) {
    const message =
      err.response?.data?.message ||
      err.message ||
      "Registration failed";
  
    setError(message);
  }
  
};


  return (
    <div className="business-login-page">

      {/* {!showRegister && (
        <div className="admin-access-container">
          <h2>User Registration</h2>
          <button className="access-btn" onClick={() => setShowRegister(true)}>
            Access
          </button>
        </div>
      )} */}

    {/* {showRegister && ( */}
    
  <div className="login-card">

    {/* <button
      className="close-btn"
      onClick={() => {
        setShowRegister(false);
        setError("");
      }}
      aria-label="Close"
    >
      ✕
    </button> */}

    <h1>Register User</h1>

          {error && <p className="error-text">{error}</p>}

          <form onSubmit={handleSubmit}>
            <div className="input-group">
              <label>Username</label>
              <input name="username" onChange={handleChange} required />
            </div>

            <div className="input-group">
              <label>Email</label>
              <input name="email" type="email" onChange={handleChange} required />
            </div>

            <div className="input-group">
              <label>Password</label>
              <input
                name="password"
                type="password"
                onChange={handleChange}
                required
              />
            </div>

            <div className="input-group">
              <label>Confirm Password</label>
              <input
                name="confirmPassword"
                type="password"
                onChange={handleChange}
                required
              />
            </div>

            <div className="input-group">
              <label>Role</label>
              <select name="role" onChange={handleChange}>
                <option value="ENDUSER">User</option>
                <option value="AGENT">Agent</option>
              </select>
            </div>

            <button className="register-btn" type="submit">
              Register 
            </button>
          </form>
        </div>
      {/* )} */}
    </div>
  );
};

export default AdminUserRegistration;
