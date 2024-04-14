import { useSelector } from 'react-redux'
import { useState,useRef, useEffect } from 'react';
import { Alert, Button, FloatingLabel } from 'flowbite-react'
import {getDownloadURL, getStorage, ref, uploadBytesResumable} from 'firebase/storage'
import {app} from '../firebase.js'
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';


export default function DashProfile() {
  
  
  const { currentUser } = useSelector(state => state.user);
  const [image, setImage] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);
  const [imageFileUploadProgress,setImageFileUploadProgress]=useState(null);
  const [imageFileUploadError,setImageFileUploadError]=useState(null);
  const pickFileRef=useRef();
  
  useEffect(()=>{
    if(image){
      uploadImage();
    }
  },[image]);
  
  const uploadImage=async ()=>{
    setImageFileUploadError(null)
    const storage= getStorage(app);
    const fileName = new Date().getTime() + image.name;
    const storageRef= ref(storage,fileName);
    const uploadTask = uploadBytesResumable(storageRef,image);
    uploadTask.on(
      'state_changed',
      (snapshot)=>{
        const progress=(snapshot.bytesTransferred/snapshot.totalBytes)*100;
        setImageFileUploadProgress(progress.toFixed(0));
      },
      (error)=>{
        setImageFileUploadError("Could not upload image (file must be less than 2MB!)")
        setImageFileUploadProgress(null)
        setImage(null)
        setImageUrl(null)
      },
      ()=>{
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL)=>{
          setImageUrl(downloadURL);
        })
      }
    )   
  }
  
  function handleChange(e) {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setImageUrl(URL.createObjectURL(file));
    }
  }


  return (
    <div className='max-w-lg mx-auto p-3 w-full'>
      <h1 className='my-7 text-center font-semibold text-3xl'>Profile</h1>
      <form className='flex flex-col'>
        <input hidden type="file" accept='image/*' onChange={handleChange} ref={pickFileRef} />
        <div className='relative w-32 h-32 self-center cursor-pointer shadow-md overflow-hidden rounded-full' onClick={()=> pickFileRef.current.click()}>
          {imageFileUploadProgress && (
            <CircularProgressbar 
              value={imageFileUploadProgress || 0}
              text={`${imageFileUploadProgress}%`}
              strokeWidth={5}
              styles={{
                root:{width:'100%',
                height:'100%',
                position:'absolute',
                top:0,left:0,
              },
              path:{
                stroke:`rgba(62,152,199,${imageFileUploadProgress/100})`
              }
              }}
            />
          )}
          <img src={imageUrl || currentUser.profilePicture} alt="User" className={`rounded-full w-full h-full object-cover border-8 border-[lightgray] ${imageFileUploadProgress && imageFileUploadProgress<100 && 'opacity-60'}`} />
        </div>
        <FloatingLabel variant='standard' type='text' id='username' label='username' defaultValue={currentUser.username} />
        <FloatingLabel variant='standard' type='email' id='email' label='email' defaultValue={currentUser.email} />
        <FloatingLabel variant='standard' type='password' id='password' label='password' />
        <Button type='submit' gradientDuoTone='purpleToBlue' outline>Update</Button>
      </form>
        <div className='m-3'>{imageFileUploadError && <Alert color='failure'>{imageFileUploadError}</Alert>}</div>
      <div className='text-red-400 flex justify-between mt-4'>
        <span className='cursor-pointer underline'>Delete Account</span>
        <span className='cursor-pointer underline'>Sign Out</span>
      </div>
    </div>
  )
}
