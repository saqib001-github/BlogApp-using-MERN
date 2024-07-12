import { useEffect, useState } from "react"
import moment from 'moment'
import { useSelector } from "react-redux"
import { FaThumbsUp } from 'react-icons/fa'
const Comment = ({ comment, onLike }) => {
    const [user, setUser] = useState({});
    const currentUser = useSelector(state => state.user);
    useEffect(() => {
        const getUser = async () => {
            try {
                const res = await fetch(`/api/user/${comment.userId}`);
                const data = await res.json();
                if (res.ok) {
                    setUser(data);
                }
            } catch (error) {
                console.log(error.message);
            }
        }
        getUser();
    }, [comment])
    return (
        <div className="flex p-4 border-b dark:border-gray-600 text-sm">
            <div className="flex-shrink-0 mr-3">
                <img src={user.profilePicture} alt={user.username} className="w-10 h-10 rounded-full bg-gray-200 object-cover" />
            </div>
            <div className="flex-1">
                <div className="flex items-center justify-between mb-1">
                    <span className="font-bold mr-1 text-xs truncate">{user ? `@${user.username}` : 'anonymous'}</span>
                    <span className="text-gray-600 text-xs">{moment(comment.createdAt).fromNow()}</span>
                </div>
                <p className="text-gray-500  break-all">{comment.content}</p>
                <div className='flex items-center pt-2 text-xs border-t dark:border-gray-700 max-w-fit gap-2'>
                    <button
                        type='button'
                        onClick={() => onLike(comment._id)}
                        className={` hover:text-blue-500 ${comment.likes.length > 0 && '!text-blue-500'}`}
                    >
                        <FaThumbsUp className='text-sm' />
                    </button>
                    <p className="text-gray-500">{comment.numberOfLikes > 0 && comment.numberOfLikes + " " + (comment.numberOfLikes === 1 ? 'Like' : 'Likes')}</p>
                </div>
            </div>
        </div>
    )
}

export default Comment