import { useState } from "react";
import './Login.css'
import {useNavigate} from 'react-router-dom'
import { signInStart, signInSuccess, signInFailure } from "../../redux/user/userSlice";
import { useDispatch, useSelector } from "react-redux";

export default function Login() {
  const [formData, setFormData] = useState({});
  const {loading, error: errorMessage} = useSelector(state => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value.trim() });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      !formData.password ||
      !formData.email
    ) {
      return dispatch(signInFailure("Fill out all fields"));
    }
    try {
      dispatch(signInStart());
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if(data.success === false){
        dispatch(signInFailure(data.message));
      }
      //setLoading(false);
      if(res.ok){
        dispatch(signInSuccess(data));
        navigate('/');
      }
    } catch (error) {
      dispatch(signInFailure(error.message));
    }
  };
  return (
    <div>
    <div className="login-main-container">
      <div className="left-login-container">
        <div className="login-form-header">
          <h5>Login Now</h5>
          <h6>A smarter investment dashboard!</h6>
        </div>
        <form className="login-form" onSubmit={handleSubmit}>
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
          <button className="login-button" type="submit" disabled={loading}>
            {
              loading ? <span>Loading...</span> : "Login"
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
            Dont have an account?{" "}
            <span>
              <a href="/signup">Signup</a>
            </span>
          </h5>
        </div>
      </div>
      <div className="right-login-container">
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
