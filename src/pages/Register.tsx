import React, { useState } from "react";
import "../styles/Register.css";

export default function Register() {
  const [formData, setFormData] = useState({
    email: "",
    name: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      const response = await fetch("http://localhost:8000/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: formData.email,
          username: formData.name,   
          password: formData.password,
          is_active: true,           
          is_admin: false,           
        }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.detail || "Registration failed");
      }

      setSuccess(true);
      console.log("Registration successful!");
      // можно редиректить на страницу логина, например
      // window.location.href = "/login";

    } catch (err: any) {
      console.error(err);
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
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
          <button type="submit" className="submit-button" disabled={loading}>
            {loading ? "Creating..." : "Create Account"}
          </button>
        </form>

        {error && <p className="error-message">{error}</p>}
        {success && <p className="success-message">Account created successfully!</p>}

        <p className="register-footer">
          Already have an account? <a href="/login">Sign In</a>
        </p>
      </div>
    </div>
  );
}
