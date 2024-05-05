import { useState } from "react";
import "./Signup.css";
import {useNavigate} from 'react-router-dom'

export default function Signup() {
  const [formData, setFormData] = useState({});
  const [errorMessage, setErrorMessage] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value.trim() });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      !formData.firstname ||
      !formData.lastname ||
      !formData.password ||
      !formData.email
    ) {
      return setErrorMessage("Fill out all fields");
    }
    try {
      setLoading(true);
      setErrorMessage(null);
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if(data.success === false){
        setLoading(false);
        return setErrorMessage(data.message);
      }
      setLoading(false);
      if(res.ok){
        navigate('/login');
      }
    } catch (error) {
      setErrorMessage(error.message);
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="signup-main-container">
        <div className="left-signup-container">
          <div className="signup-form-header">
            <h5>Register Now</h5>
            <h6>Manage your investments smarter!</h6>
          </div>
          <form className="signup-form" onSubmit={handleSubmit}>
            <input
              type="text"
              id="firstname"
              placeholder="First Name"
              onChange={handleChange}
            />
            <input
              type="text"
              id="lastname"
              placeholder="Last Name"
              onChange={handleChange}
            />
            <input
              type="email"
              id="email"
              placeholder="Email"
              onChange={handleChange}
            />
            <input
              type="password"
              id="password"
              placeholder="Enter the password"
              onChange={handleChange}
            />
            <button className="signup-button" type="submit" disabled={loading}>
              {
                loading ? <span>Loading...</span> : "Sign Up"
              }
            </button>
          </form>
          {errorMessage && (
            <div className="alert-error-message">
              <h5>{errorMessage}</h5>
            </div>
          )}
          <div className="auth-redirection">
            <h5>
              Have an account?{" "}
              <span>
                <a href="/login">Login</a>
              </span>
            </h5>
          </div>
        </div>
        <div className="right-signup-container">
          <h1>FinKore360</h1>
          <p>
            Welcome to our Investment CRM Portal, your all-in-one solution for
            managing client relationships, portfolios, and financial data
            efficiently. Streamline your investment processes, enhance
            communication, and make informed decisions with our intuitive
            platform. Empower your team to maximize client satisfaction and
            drive growth in your investment business.
          </p>
        </div>
      </div>
    </div>
  );
}
