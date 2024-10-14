import React, { useState } from "react";
import axios from "axios";
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap
import { useNavigate } from 'react-router-dom';  // Import useNavigate from react-router-dom

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");   // Reset any previous error messages
    setLoading(true);  // Set loading state to true

    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/api/password/email", // Adjust this endpoint based on your Laravel API
        { email },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      if (response.status === 200) {
        setMessage("Password reset link sent! Check your email.");
      }
    } catch (error) {
      if (error.response) {
        const serverError = error.response.data;
        setError(serverError.message || "An unknown error occurred.");
      } else {
        setError("Unable to connect to the server. Please check your connection.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center min-vh-100">
      <div className="col-md-6">
        <h2 className="text-center mb-4">Forgot Password</h2>
        
        {/* Display error message */}
        {error && <div className="alert alert-danger text-center" role="alert">{error}</div>}
        
        {/* Display success message */}
        {message && <div className="alert alert-success text-center" role="alert">{message}</div>}
        
        <form onSubmit={handleSubmit} className="card p-4 shadow-sm">
          <div className="form-group mb-3">
            <label htmlFor="email" className="form-label">Email Address</label>
            <input
              type="email"
              id="email"
              className="form-control"
              placeholder="Enter your email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <button type="submit" className="btn btn-primary w-100" disabled={loading}>
            {loading ? "Sending..." : "Send Password Reset Link"}
          </button>
        </form>
      </div>
    </div>
  );
}
