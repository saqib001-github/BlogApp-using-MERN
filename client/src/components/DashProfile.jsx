import { useSelector } from 'react-redux'
import { useState, useRef, useEffect } from 'react';
import { Alert, Button, FloatingLabel, Modal } from 'flowbite-react'
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage'
import { app } from '../firebase.js'
import { Link } from 'react-router-dom';
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import {
  updateStart, updateSuccess, updateFailure,
  deleteFailure, deleteStart, deleteSuccess,
  signoutSuccess
} from '../redux/user/userSlice.js';
import { useDispatch } from 'react-redux';
import { HiOutlineExclamationCircle } from "react-icons/hi";
export default function DashProfile() {


  const { currentUser, error, loading } = useSelector(state => state.user);
  const [image, setImage] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);
  const [imageFileUploadProgress, setImageFileUploadProgress] = useState(null);
  const [imageFileUploadError, setImageFileUploadError] = useState(null);
  const [imageFileUploading, setImageFileUploading] = useState(false);
  const [formData, setFromData] = useState({});
  const [imageUploadedSuccess, setImageUploadedSuccess] = useState(null);
  const [updateUserError, setUpdateUserError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const dispatch = useDispatch();
  const pickFileRef = useRef();

  useEffect(() => {
    if (image) {
      uploadImage();
    }
  }, [image]);

  const uploadImage = async () => {
    setImageFileUploading(true)
    setImageFileUploadError(null)
    const storage = getStorage(app);
    const fileName = new Date().getTime() + image.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, image);
    uploadTask.on(
      'state_changed',
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setImageFileUploadProgress(progress.toFixed(0));
      },
      (error) => {
        setImageFileUploadError("Could not upload image (file must be less than 2MB!)")
        setImageFileUploadProgress(null)
        setImage(null)
        setImageUrl(null)
        setImageFileUploading(false)
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setImageUrl(downloadURL);
          setFromData({ ...formData, profilePicture: downloadURL });
          setImageFileUploading(false)
        })
      }
    )
  }

  const handleChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setImageUrl(URL.createObjectURL(file));
    }
  }
  const handleInput = (e) => {
    setFromData({ ...formData, [e.target.id]: e.target.value });
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    setUpdateUserError(null);
    setImageUploadedSuccess(null)
    if (Object.keys(formData).length === 0) {
      setUpdateUserError("No changes made")
      return;
    }
    if (imageFileUploading) {
      setUpdateUserError("Please wait for image to upload")
      return;
    }
    try {
      dispatch(updateStart());
      const response = await fetch(`/api/user/update/${currentUser._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      if (!response.ok) {
        dispatch(updateFailure(data.message));
        setUpdateUserError(data.message)
      } else {
        dispatch(updateSuccess(data));
        if (imageUploadedSuccess) {
          setImageUploadedSuccess("User's image is uploaded successfully.");
        }
        setUpdateUserError(data.message)
      }

    } catch (error) {
      dispatch(updateFailure(error.message));
    }

  }

  const handleDeleteUser = async () => {
    setShowModal(false);
    try {
      dispatch(deleteStart());
      const res = await fetch(`/api/user/delete/${currentUser._id}`, {
        method: 'DELETE',
      });
      const data = res.json();
      if (!res.ok) {
        dispatch(deleteFailure(data.message));
      } else {
        dispatch(deleteSuccess(data));
      }
    } catch (error) {
      dispatch(deleteFailure(error.message));
    }
  }

  const handleSignout = async () => {
    try {
      const res = await fetch('/api/user/signout', {
        method: 'POST'
      });
      const data = res.json();
      if (!res.ok) {
        console.log(data.message);
      } else {
        dispatch(signoutSuccess());
      }
    } catch (error) {
      console.log(error.message);
    }
  }

  return (
    <div className='max-w-lg mx-auto p-3 w-full'>
      <h1 className='my-7 text-center font-semibold text-3xl'>Profile</h1>
      <form onSubmit={handleSubmit} className='flex flex-col'>
        <input hidden type="file" accept='image/*' onChange={handleChange} ref={pickFileRef} />
        <div className='relative w-32 h-32 self-center cursor-pointer shadow-md overflow-hidden rounded-full' onClick={() => pickFileRef.current.click()}>
          {imageFileUploadProgress && (
            <CircularProgressbar
              value={imageFileUploadProgress || 0}
              text={`${imageFileUploadProgress}%`}
              strokeWidth={5}
              styles={{
                root: {
                  width: '100%',
                  height: '100%',
                  position: 'absolute',
                  top: 0, left: 0,
                },
                path: {
                  stroke: `rgba(62,152,199,${imageFileUploadProgress / 100})`
                }
              }}
            />
          )}
          <img src={imageUrl || currentUser.profilePicture} alt="User" className={`rounded-full w-full h-full object-cover border-8 border-[lightgray] ${imageFileUploadProgress && imageFileUploadProgress < 100 && 'opacity-60'}`} />
        </div>
        <FloatingLabel className='mt-1' variant='standard' type='text' id='username' label='username' defaultValue={currentUser.username} onChange={handleInput} />
        <FloatingLabel className='mt-1' variant='standard' type='email' id='email' label='email' defaultValue={currentUser.email} onChange={handleInput} />
        <FloatingLabel className='mt-1' variant='standard' type='password' id='password' label='password' onChange={handleInput} />
        <Button type='submit' gradientDuoTone='purpleToBlue' outline className='mt-3' disabled={loading || imageFileUploading}>{loading ? 'Loading...':'Update'}</Button>
        {currentUser.isAdmin && (
          <Link to={'/create-post'}>
            <Button type='button' gradientDuoTone='purpleToPink' className='w-full mt-3'>Create a post</Button>
          </Link>
        )}
      </form>
      <div className='text-red-400 flex justify-between mt-4'>
        <span onClick={() => setShowModal(true)} className='cursor-pointer underline'>Delete Account</span>
        <span onClick={handleSignout} className='cursor-pointer underline'>Sign Out</span>
      </div>
      <div className='m-3'>{imageFileUploadError && <Alert color='failure'>{imageFileUploadError}</Alert>}</div>
      {imageUploadedSuccess &&
        <Alert color='success' className='mt-5'>{imageUploadedSuccess}</Alert>}
      {updateUserError && <Alert color='failure' className='mt-5'>{updateUserError}</Alert>}
      {error && <Alert color='failure' className='mt-5'>{error}</Alert>}
      <Modal dismissible show={showModal} onClose={() => setShowModal(false)} popup size='md'>
        <Modal.Header />
        <Modal.Body>
          <div>
            <HiOutlineExclamationCircle className='mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200' />
            <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
              Are you sure you want to delete this account?
            </h3>
            <div className='flex justify-center gap-6'>
              <Button color='success' onClick={() => handleDeleteUser()} >Yes</Button>
              <Button color="failure" onClick={() => setShowModal(false)} >No, Cancel</Button>
            </div>
          </div>
        </Modal.Body>


      </Modal>
    </div>
  )
}
