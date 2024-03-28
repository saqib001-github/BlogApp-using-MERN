import { Button, Navbar,TextInput } from "flowbite-react";
import { Link,useLocation } from "react-router-dom";
import { AiOutlineSearch } from 'react-icons/ai';
import {FaMoon} from "react-icons/fa"
import { useMemo } from "react";

export default function Header() {
    const path = useLocation().pathname;
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
            <Link to='sign-in'>
                <Button gradientDuoTone='purpleToBlue' outline className="">Sign In</Button>
            </Link>
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
