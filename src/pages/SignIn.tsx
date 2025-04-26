import React, { useState } from 'react';
import '../styles/SignIn.css';

const SignIn = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const params = new URLSearchParams();
      params.append('username', formData.username);
      params.append('password', formData.password);

      const response = await fetch(`http://localhost:8000/auth/login?${params.toString()}`, {
        method: 'post',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: "include",
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Login failed');
      }
      
       window.location.href = '/'; 

    } catch (error) {
      console.error('Error during login:', error);
    }
  };

  return (
    <div className="signin-container">
      <div className="signin-box">
        <h2 className="signin-title">
          Join the growing Cursor community and learn together.
        </h2>

        <button className="auth-button">Sign in with GitHub</button>
        <button className="auth-button">Sign in with Google</button>

        <form className="signin-form" onSubmit={handleSubmit}>
          <input
            type="text"
            name="username"
            placeholder="Username"
            className="signin-input"
            value={formData.username}
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            className="signin-input"
            value={formData.password}
            onChange={handleChange}
            required
          />
          <button type="submit" className="submit-button">
            Sign In
          </button>
        </form>

        <div className="signin-footer">
          Don't have an account? <a href="/signin">Register</a>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
