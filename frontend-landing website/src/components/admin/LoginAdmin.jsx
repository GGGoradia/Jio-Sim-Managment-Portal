import React, { useState } from "react";
import "@/css/Navbar.css";
import "@/css/LoginAdmin.css";

const LoginAdmin = () => {
  const [showRegister, setShowRegister] = useState(false);
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "USER",
  });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (form.password !== form.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    setError("");
    console.log("Register payload:", form);
    // API call later
  };

  return (
    <div className="business-login-page">

      {!showRegister && (
        <div className="admin-access-container">
          <h2>Admin Registration</h2>
          <button className="access-btn" onClick={() => setShowRegister(true)}>
            Access
          </button>
        </div>
      )}

      {showRegister && (
        <div className="login-card">
          <h1>Register Admin</h1>

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
                <option value="USER">Admin</option>
                <option value="AGENT">Super Admin</option>
              </select>
            </div>

            <button className="login-btn" type="submit">
              Register
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default LoginAdmin;
