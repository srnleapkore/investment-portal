import { useDispatch, useSelector } from "react-redux";
import Headerbar from "../../Components/Headerbar/Headerbar";
import { loginSuccess } from "../../redux/user/userSlice.js";
import { useEffect, useState } from "react";
import './Portal.css'
import PortalSidebar from "../../Components/PortalSidebar/Portalsidebar.jsx";
import { useLocation } from "react-router-dom";
export default function Portal() {
  const { loginData } = useSelector((state) => state.user);
  const { currentUser } = useSelector((state) => state.user);
console.log(currentUser);
  const dispatch = useDispatch();
  useEffect(() => {
    if (loginData) {
      setTimeout(() => {
        dispatch(loginSuccess(null)); // Clear signUpData after 5 seconds
      }, 5000);
    }
  }, [loginData, dispatch]);

  const location = useLocation();
  const [tab, setTab] = useState("");
  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const tabFromUrl = urlParams.get("tab");
    if (tabFromUrl){
      setTab(tabFromUrl);
    }
  }, [location.search]);

  return (
    <div>
      <Headerbar />
      {loginData && (
        <div className="temporary-login-success-popup">
          Hi {loginData.email}, Login success!
        </div>
      )}
      <div className="portal-main-container">
        <div className="portal-left-container">
        <PortalSidebar/>
        </div>
        <div className="portal-right-container">
          
        </div>    
      </div>
    </div>
  );
}
