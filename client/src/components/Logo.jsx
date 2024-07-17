import { Link } from 'react-router-dom'

const Logo = () => (
    <Link to='/' className='self-center whitespace-nowrap text-sm sm:text-xl font-semibold dark:text-white'>
        <span className='px-2 py-1 bg-gradient-to-r  text-white border-2 uppercase border-gradient-to-r rounded-md from-pink-500 via-purple-500 to-indigo-500 shadow-sm'>
            Saqib's
        </span>Blog
    </Link>
)

export default Logo