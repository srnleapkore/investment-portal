import "./AccountSideBar.css";

export default function AccountSideBar() {
  // Function to extract tab information from URL
  const getActiveTab = () => {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get("tab");
  };

  // Define the active tab
  const activeTab = getActiveTab();

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
              <li className={activeTab === "logout" ? "active" : ""}>
                <a href="/account?tab=logout">
                  <span>
                    <i className="bx bxs-log-out-circle"></i>
                  </span>
                  Logout
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
