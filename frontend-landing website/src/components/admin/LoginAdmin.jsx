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
    role: "ADMIN",
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

// //   try {
// //     const response = await fetch("", {
// //       method: "POST",
// //       headers: {
// //         "Content-Type": "application/json",
// //       },
// //       body: JSON.stringify({
// //         username: form.username,
// //         email: form.email,
// //         password: form.password,
// //         role: form.role,
// //       }),
// //     });

// //     if (!response.ok) {
// //       const data = await response.json();
// //       throw new Error(data.message || "Registration failed");
// //     }

// //     alert("Registration successful");
// //     // navigate("/bussiness/login");  // optional
//   } catch (err) {
//     setError(err.message);
//   }
};


  return (
    <div className="business-login-page">

      {!showRegister && (
        <div className="admin-access-container">
          <h2>User Registration</h2>
          <button className="access-btn" onClick={() => setShowRegister(true)}>
            Access
          </button>
        </div>
      )}

    {showRegister && (
  <div className="login-card">
    <button
      className="close-btn"
      onClick={() => {
        setShowRegister(false);
        setError("");
      }}
      aria-label="Close"
    >
      ✕
    </button>

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
                <option value="USER">User</option>
                <option value="AGENT">Agent</option>
              </select>
            </div>

            <button className="register-btn" type="submit">
              Register 
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default LoginAdmin;
