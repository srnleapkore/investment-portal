import NotificationsOutlinedIcon from '@mui/icons-material/NotificationsOutlined';
import './Headerbar.css'

export default function Headerbar() {
  return (
    <div>
        <div className="header-container">
            <div className="header-text-container">
                <h4>Welcome to Portal</h4>
                <h5>Begin a brighter future tomorrow</h5>
            </div>
            <div className="header-info-container">
                <div className="notification-icon"><NotificationsOutlinedIcon fontSize='small'/></div>
                <div className="profile-icon"><img src="https://th.bing.com/th/id/R.9f909e47ddfdd7ab255971b2575dcfb8?rik=8JdK90F8aI9J7Q&riu=http%3a%2f%2fwritestylesonline.com%2fwp-content%2fuploads%2f2016%2f08%2fFollow-These-Steps-for-a-Flawless-Professional-Profile-Picture-1024x1024.jpg&ehk=at%2bW8ahmVDAWSjLun4vkjMUmmlvUD7psBtJ5Bf9jSfA%3d&risl=&pid=ImgRaw&r=0" alt="profile" /></div>
            </div>
        </div>
    </div>
  )
}
