import { Sidebar } from 'flowbite-react'
import { HiArrowSmRight, HiDocumentText, HiOutlineUserGroup, HiUser } from 'react-icons/hi'
import { useEffect, useState } from 'react';
import { useLocation,Link } from 'react-router-dom'
import { useDispatch } from 'react-redux';
import { signoutSuccess } from '../redux/user/userSlice';
import { useSelector } from 'react-redux';
export default function DashSideBar() {
    const location = useLocation();
    const [tab, setTab] = useState('');
    const dispatch=useDispatch();
    const {currentUser} = useSelector(state=>state.user);
    useEffect(() => {
        const urlParams = new URLSearchParams(location.search)
        const tabFormUrl = urlParams.get('tab');
        if (tabFormUrl) setTab(tabFormUrl);
    }, [location.search])

    const handleSignout= async ()=>{
        try {
          const res=await fetch('/api/user/signout',{
            method:'POST'
          });
          const data=res.json();
          if(!res.ok){
            console.log(data.message);
          }else{
            dispatch(signoutSuccess());
          }
        } catch (error) {
          console.log(error.message);
        }
      }

    return (
        <Sidebar className='w-full md:w-56'>
            <Sidebar.Items>
                <Sidebar.ItemGroup className='flex flex-col gap-1'>
                    <Link to='/dashboard?tab=profile'>
                        <Sidebar.Item as='div' active={tab === 'profile'} icon={HiUser} label={currentUser.isAdmin ? 'Admin' : 'User'} >Profile</Sidebar.Item>
                    </Link>
                    { currentUser.isAdmin && <Link to='/dashboard?tab=posts'>
                        <Sidebar.Item as='div' active={tab === 'posts'} icon={HiDocumentText} >Posts</Sidebar.Item>
                    </Link>}
                    { currentUser.isAdmin && <Link to='/dashboard?tab=users'>
                        <Sidebar.Item as='div' active={tab === 'users'} icon={HiOutlineUserGroup} >Users</Sidebar.Item>
                    </Link>}

                    <Sidebar.Item icon={HiArrowSmRight} className='cursor-pointer' onClick={handleSignout} >Sign Out</Sidebar.Item>
                </Sidebar.ItemGroup>
            </Sidebar.Items>
        </Sidebar>
    )
}
