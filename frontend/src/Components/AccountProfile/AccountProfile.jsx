import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "../../firebase";

export default function AccountProfile() {
  const { currentUser } = useSelector((state) => state.user);
  const [imageFile, setImageFile] = useState(null);
  const [imageFileUrl, setImageFileUrl] = useState(null);
  const [imageFileUploadingProgress, setimageFileUploadingProgress] = useState(null);
  const [imageFileUploadError, setimageFileUploadError] = useState(null);
  const filePickerRef = useRef();
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
        setimageFileUploadError("Error uploading image to cloud");
        setimageFileUploadingProgress(null);
        setImageFile(null);
        setImageFileUrl(null);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setImageFileUrl(downloadURL);
        });
      }
    );
  };
  return (
    <div>
      <div className="account-profile-main-container">
        <div className="account-profile-header-container">
          <h1>Profile page</h1>
        </div>
        <div className="account-profile-info-change-container">
          <form>
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
                width={40}
                height={40}
              />
            </div>
            {imageFileUploadError && (
              <div className="image-upload-error">
              {imageFileUploadError}
            </div>
            )}
            {imageFileUploadingProgress && (
              <div className="image-upload-progress">
              {imageFileUploadingProgress}
            </div>
            )}
            
            <div className="my-profile-info-canva">
              <input
                type="text"
                id="firstname"
                placeholder="firstname"
                defaultValue={currentUser.firstname}
              />
              <input
                type="text"
                id="lastname"
                placeholder="lastname"
                defaultValue={currentUser.lastname}
              />
              <input
                type="email"
                id="email"
                placeholder="Email"
                defaultValue={currentUser.email}
              />
              <input type="password" id="password" placeholder="*********" />
              <button type="submit">Update</button>
            </div>
          </form>
          <div className="profile-deletion-container">
            <a href="">Delete profile</a>
          </div>
        </div>
      </div>
    </div>
  );
}
