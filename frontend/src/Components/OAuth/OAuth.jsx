import { GoogleAuthProvider, signInWithPopup, getAuth } from "firebase/auth";
import { app } from "../../firebase";
import { useDispatch } from "react-redux";
import { loginSuccess, signInSuccess } from "../../redux/user/userSlice";
import { useNavigate } from "react-router-dom";
import GoogleIcon from '@mui/icons-material/Google';
import './OAuth.css'

export default function OAuth() {
  const auth = getAuth(app);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleGoogle = async () => {
    const provider = new GoogleAuthProvider();
    provider.setCustomParameters({ prompt: "select_account" });
    try {
      const resultsFromGoogle = await signInWithPopup(auth, provider);
      const res = await fetch("/api/auth/google", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: resultsFromGoogle.user.displayName,
          email: resultsFromGoogle.user.email,
          googlePhotoUrl: resultsFromGoogle.user.photoURL,
        }),
      });
      const data = await res.json();
      if (res.ok) {
        dispatch(signInSuccess(data));
        dispatch(loginSuccess({ email: resultsFromGoogle.user.email }));
        navigate("/");
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <div className="or-divider">
        <span className="left-or-divider"></span><span className="or-divider-text">or</span><span className="right-or-divider"></span>
      </div>
      <button
        type="button"
        className="google-auth-button"
        onClick={handleGoogle}
      >
        <GoogleIcon className="google-icon" style={{ fontSize: '15px' }} />
        Continue with Google
      </button>
    </div>

  );
}
