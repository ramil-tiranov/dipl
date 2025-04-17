import React, { useState } from "react";
import "../styles/Register.css";

export default function Register() {
  const [formData, setFormData] = useState({
    email: "",
    name: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Registering:", formData);
  };

  return (
    <div className="register-container">
      <div className="register-box">
        <h1 className="register-title">
          Join the growing Cursor community and learn together.
        </h1>

        <button className="auth-button">
          <span>🔗</span>&nbsp;Sign in with GitHub
        </button>

        <button className="auth-button">
          <span>📧</span>&nbsp;Sign in with Google
        </button>

        <form className="register-form" onSubmit={handleSubmit}>
          <input
            className="register-input"
            type="text"
            name="name"
            placeholder="Full Name"
            value={formData.name}
            onChange={handleChange}
            required
          />
          <input
            className="register-input"
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <input
            className="register-input"
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
          />
          <button type="submit" className="submit-button">
            Create Account
          </button>
        </form>

        <p className="register-footer">
          Already have an account? <a href="/login">Sign In</a>
        </p>
      </div>
    </div>
  );
}
