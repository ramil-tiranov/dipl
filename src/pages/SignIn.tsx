import React from 'react';
import '../styles/SignIn.css';

const SignIn = () => {
  return (
    <div className="signin-container">
      <div className="signin-box">
        <h2 className="signin-title">
          Join the growing Cursor community and learn together.
        </h2>

        <button className="auth-button">Sign in with GitHub</button>
        <button className="auth-button">Sign in with Google</button>

        <form className="signin-form">
          <input
            type="email"
            placeholder="Email"
            className="signin-input"
            required
          />
          <input
            type="password"
            placeholder="Password"
            className="signin-input"
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
