import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  signInStart,
  signInSuccess,
  signInFailure,
  signUpSuccess,
  clearError,
  loginSuccess,
  logOutMSuccess,
} from "../../redux/user/userSlice.js";
import { useDispatch, useSelector } from "react-redux";
import OAuth from "../../Components/OAuth/OAuth";
import "./Login.css";
import { CircularProgress } from "@mui/material";

export default function Login() {
  const [formData, setFormData] = useState({});
  const {
    loading,
    error: errorMessage,
    signUpData,
    logoutData,
  } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(clearError());
  }, [dispatch]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value.trim() });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.password || !formData.email) {
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
      if (data.success === false) {
        dispatch(signInFailure(data.message));
      }
      if (res.ok) {
        dispatch(signInSuccess(data));
        dispatch(loginSuccess({ ...data, firstName: formData.firstname }));
        navigate("/");
      }
    } catch (error) {
      dispatch(signInFailure(error.message));
    }
  };

  useEffect(() => {
    if (signUpData) {
      setTimeout(() => {
        dispatch(signUpSuccess(null));
      }, 5000);
    }
  }, [signUpData, dispatch]);

  useEffect(() => {
    if (logoutData) {
      setTimeout(() => {
        dispatch(logOutMSuccess(null));
      }, 5000);
    }
  }, [logoutData, dispatch]);

  return (
    <div>
      <div className="login-main-container">
        <div className="left-login-container">
          <div className="login-form-header">
            {signUpData && (
              <div className="temporary-signup-success-popup">
                Hi {signUpData.firstName}, your signup is successful, login now!
              </div>
            )}
            {logoutData && (
              <div className="temporary-signup-success-popup">
                Logged Out Successfully!
              </div>
            )}
            <h5>Login Now</h5>
            <h6>A smarter investment dashboard!</h6>
            {errorMessage && (
              <div className="alert-error-message">{errorMessage}</div>
            )}
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
              {loading ? (
                <span>
                  <CircularProgress color="inherit" size={13} /> Loading...
                </span>
              ) : (
                "Login"
              )}
            </button>
            <OAuth />

            <div className="auth-redirection">
              <h5>
                Dont have an account?{" "}
                <span>
                  <a href="/signup">Signup</a>
                </span>
              </h5>
            </div>
          </form>
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
