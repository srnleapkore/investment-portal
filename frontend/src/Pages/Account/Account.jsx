import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Headerbar from "../../Components/Headerbar/Headerbar";
import AccountSideBar from "../../Components/AccountSideBar/AccountSideBar";
import AccountProfile from "../../Components/AccountProfile/AccountProfile";
import './Account.css'
import AccountMainTab from "../../Components/AccountMainTab/AccountMainTab";

export default function Account() {
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
      <Headerbar/>
      <div className="account-main-container">
        <div className="account-left-container">
        <AccountSideBar/>
        </div>
        <div className="account-right-container">
          {tab === 'profile' && <AccountProfile/>}
          {tab === 'myaccount' && <AccountMainTab/>}
        </div>    
      </div>
    </div>
  );
}
