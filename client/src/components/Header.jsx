import { Avatar, Button, Dropdown, Navbar,TextInput } from "flowbite-react";
import { Link,useLocation } from "react-router-dom";
import { AiOutlineSearch } from 'react-icons/ai';
import {FaMoon} from "react-icons/fa"
import { useMemo } from "react";
import {  useSelector } from "react-redux";
export default function Header() {
    const path = useLocation().pathname;
    const {currentUser}=useSelector(state=>state.user);
    const activepath=useMemo(()=>path,[path]);
  return (
    <Navbar className="border-b-2">
        <Link to="/" className="self-center whitespace-nowrap text-sm sm:text-xl font-semibold dark:text-white">
            <span className="px-2 rounded-lg text-white">Saqib`s</span>
            Blog
        </Link>
        <form>
            <TextInput 
                type="text"
                placeholder="Search..."
                rightIcon={AiOutlineSearch}
                className="hidden lg:inline"
            />
        </form>
        <Button className="w-12 h-10 lg:hidden" color="gray" pill>
            <AiOutlineSearch/>
        </Button>
        <div className="flex gap-2 md:order-2">
            <Button className="w-12 h-10 hidden sm:inline" color="gray" pill>
                <FaMoon/>
            </Button>
            {currentUser ? (
                <Dropdown 
                    arrowIcon={false}
                    inline
                    label={
                        <Avatar
                            alt="user"
                            img={currentUser.profilePicture}
                            rounded
                        />
                    }
                >
                    <Dropdown.Header>
                        <span className="block text-sm">@{currentUser.username}</span>
                        <span className="block text-sm font-medium truncate">{currentUser.email}</span>
                    </Dropdown.Header>
                    <Link to={'/dashboard?tab=profile'}>
                        <Dropdown.Item>Profile</Dropdown.Item>
                        <Dropdown.Divider></Dropdown.Divider>
                        <Dropdown.Item>Sign out</Dropdown.Item>
                    </Link>
                </Dropdown>
            ) :(

                <Link to='sign-in'>
                    <Button gradientDuoTone='purpleToBlue' outline className="">Sign In</Button>
                </Link>
            )}
            <Navbar.Toggle/>
        </div>
            <Navbar.Collapse>
                <Navbar.Link active={activepath ==='/'} as={"div"}>
                    <Link to='/'>Home</Link>
                </Navbar.Link>
                <Navbar.Link active={activepath === '/about'} as={"div"}>
                    <Link to='/about'>About</Link>
                </Navbar.Link>
                <Navbar.Link active={activepath === '/projects'} as={"div"}>
                    <Link to='/projects'>Projects</Link>
                </Navbar.Link>
            </Navbar.Collapse>
    </Navbar>
  )
}
