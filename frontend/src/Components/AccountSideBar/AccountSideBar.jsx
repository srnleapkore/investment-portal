import { useDispatch, useSelector } from "react-redux";
import { logOutMSuccess, logoutSuccess } from "../../redux/user/userSlice";
import "./AccountSideBar.css";

export default function AccountSideBar() {
  const {currentUser} = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const getActiveTab = () => {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get("tab");
  };

  const activeTab = getActiveTab();
 
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
      <link
        rel="stylesheet"
        href="https://cdn.jsdelivr.net/npm/boxicons@latest/css/boxicons.min.css"
      ></link>
      <link
        rel="stylesheet"
        href="https://unpkg.com/boxicons@latest/css/boxicons.min.css"
      ></link>
      <div className="account-sidebar-main-container">
        <div className="account-sidebar-menu-container">
          <div className="account-menu-listing">
            <ul>
              <li className={activeTab === "profile" ? "active" : ""}>
                <a href="/account?tab=profile">
                  <span>
                    <i className="bx bxs-user-circle"></i>
                  </span>
                  Profile
                </a>
              </li>
              <li className={activeTab === "myaccount" ? "active" : ""}>
                <a href="/account?tab=myaccount">
                  <span>
                    <i className="bx bxs-user-account"></i>
                  </span>
                  My account
                </a>
              </li>
              <li onClick={handleSignOut} className={activeTab === "logout" ? "active" : ""}>
                <a href="/account?tab=logout">
                  <span >
                    <i className="bx bxs-log-out-circle"></i>
                  </span>
                  Logout
                </a>
              </li>
              {currentUser.isAdmin && (
                <li>
                <a href="/admin/dashboard">
                  <span >
                    <i className="bx bxs-log-out-circle"></i>
                  </span>
                  Dashboard
                </a>
              </li>
              )}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
