import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "../../firebase";
import {
  updateStart,
  updateSuccess,
  updateFailure,
  deleteUserStart,
  deleteUserSuccess,
  deleteUserFailure,
} from "../../redux/user/userSlice";
import { useDispatch } from "react-redux";
import "./AccountProfile.css";
import { LinearProgress } from "@mui/material";

export default function AccountProfile() {
  const { currentUser } = useSelector((state) => state.user);
  const [imageFile, setImageFile] = useState(null);
  const [imageFileUrl, setImageFileUrl] = useState(null);
  const [imageFileUploadingProgress, setimageFileUploadingProgress] =
    useState(null);
  const [imageFileUploadError, setimageFileUploadError] = useState(null);
  const [imageFileUploading, setImageFileUploading] = useState(false);
  const [updateUserSuccess, setUpdateUserSuccess] = useState(null);
  const [updateUserError, setUpdateUserError] = useState(null);
  const [updatePassError, setUpdatePassError] = useState(null);
  const [showModel, setShowModel] = useState(false);
  const [profileFormData, setProfileFormData] = useState({
    firstname: currentUser.firstname,
    lastname: currentUser.lastname,
    email: currentUser.email,
  });
  const [passwordFormData, setPasswordFormData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const filePickerRef = useRef();
  const dispatch = useDispatch();

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setImageFileUrl(URL.createObjectURL(file));
    }
  };

  useEffect(() => {
    if (imageFile) {
      uploadImage();
    }
  }, [imageFile]);

  const uploadImage = async () => {
    setImageFileUploading(true);
    setimageFileUploadError(null);
    const storage = getStorage(app);
    const fileName = new Date().getTime() + imageFile.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, imageFile);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setimageFileUploadingProgress(progress.toFixed(0));
      },
      (error) => {
        setimageFileUploadError(
          "Failed to upload the image. File should be less than 2MB"
        );
        setimageFileUploadingProgress(null);
        setImageFile(null);
        setImageFileUrl(null);
        setImageFileUploading(false);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setImageFileUrl(downloadURL);
          setProfileFormData((prevFormData) => ({
            ...prevFormData,
            profilepicture: downloadURL,
          }));
          setImageFileUploading(false);
        });
      }
    );
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (showModel && !event.target.closest(".popup-delete-confirmation")) {
        setShowModel(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showModel]);

  const handleProfileChange = (e) => {
    setProfileFormData({ ...profileFormData, [e.target.id]: e.target.value });
  };

  const handlePasswordChange = (e) => {
    setPasswordFormData({
      ...passwordFormData,
      [e.target.id]: e.target.value,
    });
  };

  const handleProfileSubmit = async (e) => {
    e.preventDefault();
    setUpdateUserError(null);
    setUpdateUserSuccess(null);

    const hasChanges = Object.keys(profileFormData).some(
      (key) => profileFormData[key] !== currentUser[key]
    );

    if (!hasChanges) {
      setUpdateUserError("Upload image to update");
      return;
    }

    if (imageFileUploading) {
      setUpdateUserError("Image is uploading");
      return;
    }

    try {
      dispatch(updateStart());
      const res = await fetch(`/api/user/updateprofile/${currentUser._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(profileFormData),
      });
      const data = await res.json();
      if (!res.ok) {
        dispatch(updateFailure(data.message));
        setUpdateUserError(data.message);
      } else {
        dispatch(updateSuccess(data));
        setUpdateUserSuccess("Profile Updated Successfully!");
        setTimeout(() => {
          setUpdateUserSuccess(null);
        }, 5000);
        setimageFileUploadingProgress(null);
        setImageFile(null);
        setImageFileUrl(null);
        setImageFileUploading(false);
      }
    } catch (error) {
      dispatch(updateFailure(error.message));
      setUpdateUserError(error.message);
    }
  };

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();

    try {
      const { currentPassword, newPassword, confirmPassword } =
        passwordFormData;

      if (!currentPassword) {
        setUpdatePassError("Enter the current password");
        return;
      }

      if (newPassword !== confirmPassword) {
        setUpdatePassError("New password and confirm password do not match");
        return;
      }

      if (newPassword.length < 8) {
        setUpdatePassError("New password must be at least 8 characters");
        return;
      }

      const res = await fetch(`/api/user/changepass/${currentUser._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          currentPassword,
          newPassword,
          confirmPassword,
        }),
      });

      if (!res.ok) {
        const data = await res.json();
        setUpdatePassError(data.message);
      } else {
        const data = await res.json();
        setUpdateUserSuccess("Password updated successfully!");
        setPasswordFormData({
          currentPassword: "",
          newPassword: "",
          confirmPassword: "",
        });
        setTimeout(() => {
          setUpdateUserSuccess(null);
        }, 5000);
      }
    } catch (error) {
      setUpdatePassError(error.message);
    }
  };

  const handleDeleteUser = async () => {
    setShowModel(false);
    try {
      dispatch(deleteUserStart());
      const res = await fetch(`/api/user/deleteuser/${currentUser._id}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (!res) {
        dispatch(deleteUserFailure(data.message));
      } else {
        dispatch(deleteUserSuccess(data));
      }
    } catch (error) {
      dispatch(deleteUserFailure(error.message));
    }
  };

  return (
    <div>
      {updateUserSuccess && (
        <div className="account-updation-success-popup">
          {updateUserSuccess}
        </div>
      )}
      <div className="profile-tab-main-container-grid">
        <div className="vertical-tab-profile">
          <div className="account-profile-main-container">
            <div className="account-profile-header-container">
              <h1>Profile Details</h1>
            </div>
            <div className="account-profile-info-change-container">
              <form onSubmit={handleProfileSubmit}>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  ref={filePickerRef}
                  hidden
                ></input>
                <div
                  className="user-profile-change-picture"
                  onClick={() => filePickerRef.current.click()}
                >
                  <img
                    src={imageFileUrl || currentUser.profilepicture}
                    alt="user"
                  />
                  <i className="bx bxs-edit-alt"></i>
                </div>
                {imageFileUploadError && (
                  <div className="image-upload-error">
                    {imageFileUploadError}
                  </div>
                )}

                <div className="my-profile-info-canva">
                  <input
                    className="none-writable-input"
                    type="text"
                    id="firstname"
                    placeholder="firstname"
                    value={profileFormData.firstname}
                    title="You don't have access to edit this field"
                    disabled
                  />
                  <input
                    className="none-writable-input"
                    type="text"
                    id="lastname"
                    placeholder="lastname"
                    value={profileFormData.lastname}
                    title="You don't have access to edit this field"
                    disabled
                  />
                  <input
                    className="none-writable-input"
                    type="email"
                    id="email"
                    placeholder="Email"
                    value={profileFormData.email}
                    title="You don't have access to edit this field"
                    disabled
                  />
                  {imageFileUploadingProgress && (
                    <div className="image-upload-progress">
                      <LinearProgress
                        variant="determinate"
                        value={imageFileUploadingProgress}
                        className="custom-progress"
                      />
                    </div>
                  )}
                  <button className="update-button" type="submit">
                    Update Profile Image
                  </button>
                </div>
              </form>
              {updateUserError && (
                <div className="profile-update-error-alert">
                  {updateUserError}
                </div>
              )}
            </div>
            </div>
            <div>
              {showModel && <div className="overlay"></div>}
              <div
                className={`account-action-tab-container ${
                  showModel ? "overlay-active" : ""
                }`}
              >
                <div className="delete-account-container">
                  <h1>Want to delete your account?</h1>
                  <p>Note: Please note that once you proceed with deletion, your profile cannot be recovered.</p>
                  <button onClick={() => setShowModel(true)} className="delete-profile-main-button">Delete Account</button>
                 
                </div>
              </div>
              {showModel && (
                <div className="popup-delete-confirmation">
                  <div className="popup-delete-content">
                    <h5>Confirm your request!</h5>
                    <p>Are you sure you want to delete your profile?</p>
                    <div className="delete-profile-button-container">
                      <button
                        className="close-delete-profile-button"
                        onClick={() => setShowModel(false)}
                      >
                        Abort
                      </button>
                      <button
                        className="delete-profile-button"
                        onClick={handleDeleteUser}
                      >
                        Confirm
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          
        </div>

        <div className="account-change-password-main-container">
          <div className="account-profile-header-container">
            <h1>Change Password</h1>
          </div>
          <div className="account-pass-change-container">
            <form onSubmit={handlePasswordSubmit}>
              <div className="change-pass-canva">
                <input
                  type="password"
                  id="currentPassword"
                  placeholder="Current Password"
                  value={passwordFormData.currentPassword}
                  onChange={handlePasswordChange}
                />
                <input
                  type="password"
                  id="newPassword"
                  placeholder="New Password"
                  value={passwordFormData.newPassword}
                  onChange={handlePasswordChange}
                />
                <input
                  type="password"
                  id="confirmPassword"
                  placeholder="Confirm Password"
                  value={passwordFormData.confirmPassword}
                  onChange={handlePasswordChange}
                />
                <button className="update-button" type="submit">
                  Update Password
                </button>
              </div>
            </form>
            {updatePassError && (
              <div className="pass-update-error-alert">{updatePassError}</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
