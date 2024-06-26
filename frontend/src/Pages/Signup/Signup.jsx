import { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { signInStart, signInSuccess, signInFailure, signUpSuccess, clearError } from "../../redux/user/userSlice";
import { useDispatch, useSelector } from "react-redux";
import OAuth from "../../Components/OAuth/OAuth";
import { CircularProgress } from "@mui/material";
import './Signup.css'

export default function Signup() {
  const [formData, setFormData] = useState({});
  const { loading, error: errorMessage } = useSelector(state => state.user);
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
    if (
      !formData.firstname ||
      !formData.lastname ||
      !formData.password ||
      !formData.email
    ) {
      return dispatch(signInFailure("Fill out all fields"));
    }
    try {
      dispatch(signInStart());
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if(data.success === false){
        dispatch(signInFailure(data.message));
      }
      if(res.ok){
        dispatch(signInSuccess());
        dispatch(signUpSuccess({ ...data, firstName: formData.firstname }));
        navigate('/login');
      }
    } catch (error) {
      dispatch(signInFailure(error.message));
    }
  };

  return (
    <div>
      <div className="signup-main-container">
        <div className="left-signup-container">
          <div className="signup-form-header">
            <h5>Register Now</h5>
            <h6>Manage your investments smarter!</h6>
            {errorMessage && (
            <div className="alert-error-message">
              {errorMessage}
            </div>
          )}
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
                loading ? <span><CircularProgress color="inherit" size={13} /><span> Loading...</span></span> : "Sign Up"
              }
            </button>
            <OAuth/>
            
          <div className="auth-redirection">
            <h5>
              Have an account?{" "}
              <span>
                <a href="/login">Login</a>
              </span>
            </h5>
          </div>
          </form>
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
