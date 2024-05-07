import { useDispatch, useSelector } from "react-redux";
import Headerbar from "../../Components/Headerbar/Headerbar";
import { loginSuccess } from "../../redux/user/userSlice.js";
import { useEffect } from "react";
import './Portal.css'
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
  return (
    <div>
      <Headerbar />
      {loginData && (
        <div className="temporary-login-success-popup">
          Hi {loginData.email}, Login success!
        </div>
      )}
    </div>
  );
}
