import {useSelector} from 'react-redux'
import {Button, FloatingLabel} from 'flowbite-react'
export default function DashProfile() {
  const {currentUser}=useSelector(state=>state.user);
  return (
    <div className='max-w-lg mx-auto p-3 w-full'>
      <h1 className='my-7 text-center font-semibold text-3xl'>Profile</h1>
      <form className='flex flex-col'>
        <div className='w-32 h-32 self-center cursor-pointer shadow-md overflow-hidden rounded-full'>
        <img src={currentUser.profilePicture} alt="User" className='rounded-full w-full h-full object-cover border-8 border-[lightgray]' />
        </div>
        <FloatingLabel variant='standard' type='text' id='username' label='username' defaultValue={currentUser.username} />
        <FloatingLabel variant='standard' type='email' id='email' label='email' defaultValue={currentUser.email} />
        <FloatingLabel variant='standard' type='password' id='password' label='password' />
        <Button type='submit' gradientDuoTone='purpleToBlue' outline>Update</Button>
      </form>
      <div className='text-red-400 flex justify-between mt-4'>
        <span className='cursor-pointer underline'>Delete Account</span>
        <span className='cursor-pointer underline'>Sign Out</span>
      </div>
    </div>
  )
}
