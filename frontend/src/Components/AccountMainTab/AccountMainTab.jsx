import "./AccountMainTab.css";
import { logOutMSuccess, logoutSuccess } from "../../redux/user/userSlice.js";
import { useDispatch } from "react-redux";

export default function AccountMainTab() {
  const dispatch = useDispatch();

  const handleSignOut = async () => {
    try {
      const res = await fetch(`/api/user/logout`, {
        method: "POST",
      });
      const data = await res.json();
      if (!res.ok) {
        console.log(data.message); 
      } else {
        
        dispatch(logOutMSuccess("Logged Out Successfully!"));
        dispatch(logoutSuccess()); 
      }
    } catch (error) {
      console.log(error.message); 
    }
  };

  return (
    <div>
      <div className="account-tab-main-container">
        <h1>Welcome to the Account Page!</h1>
        <p>
          Take charge of your user profile with ease, from uploading a new
          profile picture to editing your personal details. Effortlessly
          navigate through options to update your information and keep your
          account secure by changing your password. Stay organized and in
          control of your account settings with intuitive features designed for
          convenience
        </p>
        <div className="account-navigator-button-container">
          <div className="profile-redirect-button">
            <a href="/account?tab=profile">My Profile</a>
          </div>
          <div className="logout-redirect-button" onClick={handleSignOut}>
            Logout
          </div>
        </div>
      </div>
    </div>
  );
}
