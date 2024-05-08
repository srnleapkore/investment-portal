import './Portalside.css'

export default function PortalSidebar() {
  const getActiveTab = () => {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get("tab");
  };

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
      <div className="portal-sidebar-main-container">
        <div className="portal-sidebar-menu-container">
          <div className="portal-menu-listing">
            <ul>
              <li className={activeTab === "dashboard" ? "active" : ""}>
                <a href="/portal?tab=dashboard">
                  <span>
                    <i className="bx bxs-user-circle"></i>
                  </span>
                  Dashboard
                </a>
              </li>
              <li className={activeTab === "properties" ? "active" : ""}>
                <a href="/portal?tab=properties">
                  <span>
                    <i className="bx bxs-user-account"></i>
                  </span>
                  Properties
                </a>
              </li>
              <li className={activeTab === "properties" ? "active" : ""}>
                <a href="/portal?tab=properties">
                  <span>
                    <i className="bx bxs-user-account"></i>
                  </span>
                  Transactions
                </a>
              </li>
              <li className={activeTab === "properties" ? "active" : ""}>
                <a href="/portal?tab=properties">
                  <span>
                    <i className="bx bxs-user-account"></i>
                  </span>
                  Investments
                </a>
              </li>
              <li className={activeTab === "properties" ? "active" : ""}>
                <a href="/portal?tab=properties">
                  <span>
                    <i className="bx bxs-user-account"></i>
                  </span>
                  Referrals
                </a>
              </li>
              <li className={activeTab === "properties" ? "active" : ""}>
                <a href="/portal?tab=properties">
                  <span>
                    <i className="bx bxs-user-account"></i>
                  </span>
                  Help
                </a>
              </li>
              <li className={activeTab === "properties" ? "active" : ""}>
                <a href="/portal?tab=properties">
                  <span>
                    <i className="bx bxs-user-account"></i>
                  </span>
                  Know more
                </a>
              </li>

            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
