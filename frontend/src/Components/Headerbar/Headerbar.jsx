import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import "./Headerbar.css";
import { useSelector } from "react-redux";
import { useState } from "react";

export default function Headerbar() {
  const { currentUser } = useSelector((state) => state.user);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const truncatedEmail = (email, limit) => {
    if (email.length > limit) {
      return email.substring(0, limit) + "...";
    }
    return email;
  };

  return (
    <div>
      <div className="header-container">
        <div className="header-text-container">
          <div className="header-logo-container">
            <h1>FinKore360</h1>
          </div>
          <div className="header-welcome-conatiner">
            <h4>Welcome, {currentUser.firstname}</h4>
            <h5>Begin a brighter future tomorrow</h5>
          </div>
        </div>
        <div className="header-info-container">
          <div className="notification-icon">
            <NotificationsOutlinedIcon fontSize="small" />
          </div>
          {currentUser ? (
            <div
              className="profile-icon"
              onMouseEnter={toggleDropdown}
              onMouseLeave={toggleDropdown}
              onClick={toggleDropdown}
            >
              <img src={currentUser.profilepicture} alt="profile" />
              <div
                className={`dropdown-profile-menu ${
                  isDropdownOpen ? "fade-up" : ""
                }`}
              >
                <p>{currentUser.firstname}</p>
                <p className="dropdown-email">
                  {truncatedEmail(currentUser.email, 20)}
                </p>
                <div className="menu-divider"></div>
                <ul>
                  <li>
                    <a href="/account?tab=profile">Profile</a>
                  </li>
                  <li>
                    <a href="/account">Account</a>
                  </li>

                  <li>
                    <button className="logout-header-button">Logout</button>
                  </li>
                </ul>
              </div>
            </div>
          ) : (
            <div className="profile-icon">
              <img
                src="https://th.bing.com/th/id/R.9f909e47ddfdd7ab255971b2575dcfb8?rik=8JdK90F8aI9J7Q&riu=http%3a%2f%2fwritestylesonline.com%2fwp-content%2fuploads%2f2016%2f08%2fFollow-These-Steps-for-a-Flawless-Professional-Profile-Picture-1024x1024.jpg&ehk=at%2bW8ahmVDAWSjLun4vkjMUmmlvUD7psBtJ5Bf9jSfA%3d&risl=&pid=ImgRaw&r=0"
                alt="profile"
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
