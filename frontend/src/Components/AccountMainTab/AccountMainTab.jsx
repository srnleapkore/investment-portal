import './AccountMainTab.css'
export default function AccountMainTab() {
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
          <span className='dashboard-redirect-button'><a href="/">Go to Dashboard</a></span>
          <span className='profile-redirect-button'><a href="/account?tab=profile">My Profile</a></span>
        </div>
      </div>
    </div>
  );
}
