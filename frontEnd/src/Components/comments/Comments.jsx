import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import moment from "moment";
import { FaThumbsUp } from "react-icons/fa";

const Comments = ({comment,onCommentLike,onEditComment}) => {

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

    const [isEditing, setIsEditing] = useState(false);
    const [editedCommentContent ,setEditedCommentContent] = useState(comment.content)
    const HandleEditTheComment = () =>{
        setIsEditing(true);
        setEditedCommentContent(comment.content)
    } 

    const handleSave = async() =>{ //pour sauvegarder le comment update
        try {
            const res = await fetch(`/backend/comment/editComment/${comment._id}`,{
                method:'PUT',
                headers:{
                    'Content-Type':'application/json'
                },
                body:JSON.stringify({ content: editedCommentContent })
            });

            if(res.ok){
                setIsEditing(false);
                onEditComment(comment , editedCommentContent);
            }

        } catch (error) {
            console.log(error.message)
        }
    }


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

        {
            isEditing ? (
                <>
                <textarea
                  className='w-full bg-[#c0bebe34] rounded-md resize-none focus:outline-none p-2 mb-2'
                  rows={3}
                  value={editedCommentContent}
                  onChange={(e) => setEditedCommentContent(e.target.value)} 
                />
                <div className='flex justify-end gap-2 text-xs' >
                    <button
                     type='button'
                     className='p-2 bg-gradient-to-r from-indigo-600 to-pink-600 text-white rounded-lg'
                     onClick={handleSave}
                    >
                        Enregitrer
                    </button>
                    <button
                     type='button'
                     className='p-2 border border-pink-600 rounded-lg hover:bg-gradient-to-r from-indigo-600 to-pink-600 
                               hover:border-transparent hover:text-white transition-all'
                    onClick={() => setIsEditing(false)}
                    >
                        Annuler
                    </button>
                </div>
                </>
            ) : (
              <>
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
                    {
                        currentUser && (currentUser._id === comment.userId || currentUser.isAdmin) && (
                            <button
                            type='button'
                            onClick={() => HandleEditTheComment()}
                            className='text-gray-400 hover:text-indigo-500'
                            >
                                Modifier
                            </button>
                        )
                    }
                </div>
              </>  
            )
        }
        
     </div>
    </div>
  )
}

export default Comments
