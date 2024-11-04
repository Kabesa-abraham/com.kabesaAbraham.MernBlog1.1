import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import moment, {  } from "moment";
import { FaThumbsUp } from "react-icons/fa";

const Comments = ({comment,onCommentLike}) => {

    const {theme} = useSelector(state => state.theme);
    const {currentUser} = useSelector(state => state.user);

    const [user,setUser] = useState({});
    useEffect(()=>{
        const getUser = async()=>{
            try {
                const res = await fetch(`/backend/user/${comment.userId}`)  //je trouve les infos du user qui a écrit le comment
                const data = await res.json()
                if(res.ok){
                    setUser(data)
                }
            } catch (error) {
                console.log(error.message)
            }
        }
        getUser()
    },[comment])


  return (
    <div className={`flex p-4 border-b text-sm ${theme==='dark'&&'border-gray-600'}`} >
     <div className='flex-shrink-0 mr-3'>
        <img src={user.profilePicture} alt={user.username} 
             className='w-10 h-10 rounded-full bg-gray-200'
        />
     </div>
     <div className='flex-1'>
        <div className='flex items-center mb-1' >
            <span className='font-bold mr-1 text-xs truncate' >{user? `@${user.username}` : "Utilisateur anonyme"}</span>
            <span className='text-gray-500 text-xs' >
                {moment(comment.createdAt).fromNow()}  {/*en utilisant le package moment ça ma permis de calculer le temps de création du post jusqu'a maintemant*/ }
            </span>
        </div>

        <p className='text-gray-500 pb-2' >{comment.content}</p>
        <div className={`flex items-center pt-2 text-xs border-t max-w-fit ${theme==='dark'&&'border-t-gray-700'}  gap-2 `} >
            <button type='button' onClick={()=> onCommentLike(comment._id)} 
                    className={`text-gray-400 hover:text-blue-500 ${currentUser && comment.likes.includes(currentUser._id) && '!text-blue-500' } `  }
             >
                <FaThumbsUp className='text-sm' />
            </button>
            <p className='text-gray-400' >
               {comment.numberOfLikes > 0 && comment.numberOfLikes + " " + 
                 (comment.numberOfLikes === 1 ? 'Like' : 'Likes')
               }
            </p>
        </div>
     </div>
    </div>
  )
}

export default Comments