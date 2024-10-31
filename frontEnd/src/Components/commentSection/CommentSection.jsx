import React, { useEffect, useState } from 'react'
import './commentSection.css'
import { useSelector } from 'react-redux'
import profilePicImg from '../../assets/user_1728405613943.jpg'
import { Link } from 'react-router-dom'
import { Alert, ButtonBase } from '@mui/material'
import {MdError, MdOutlineComment} from 'react-icons/md'

const CommentSection = ({postId}) => {
    const {currentUser} = useSelector(state => state.user) //pour prendre l'utilisateur

    const [comment ,setComment] = useState(''); //pour le nombre de caractères qui sera dans le commentaire
    const [commentError, setCommentError] = useState(null);

    const handleSendComment = async(e) =>{
        e.preventDefault()

        if(comment.length > 200){
            return;
        }
        try {
            const res = await fetch('/backend/comment/create' , {
                method:'POST',
                headers:{
                    "Content-Type" : "application/json"
                },
                body:JSON.stringify({content:comment,
                                     postId,
                                     userId:currentUser._id}) //je renvoi les données en question en json
            })
            const data = await res.json();
    
            if(res.ok){
                setCommentError(null)
                setComment('')// je clear le champ du commentaire
            }
        } catch (error) {
            setCommentError(error.message)
        }  
    }

    const [showComments, setShowComment] = useState([])
    useEffect(()=> {
        const showgetComments = async() =>{
            try {
                const res = await fetch(`/backend/comment/getPostComments/${postId}`);

                if(res.ok){
                    const data = await res.json();
                    setShowComment(data);
                }
            } catch (error) {
               console.log(error.message) 
            }
        }
        showgetComments();
    },[postId])
    
  return (
    <div className='max-w-2xl mx-auto w-full p-3 comment_container' >
      {
        currentUser ?
        (
            <div className='flex items-center gap-2 my-5 text-gray-500 text-sm ' >
                <p>Connectez en tant que: </p>
                <img src={currentUser.profilePicture? currentUser.profilePicture : profilePicImg} alt=""
                     className='h-6 w-6 object-cover rounded-full '
                 />
                <Link to={'/dashboard?tab=profile'} className='text-xs text-cyan-600 hover:underline' >
                    @{currentUser.username}
                </Link>
            </div>
        ) : 
        (
            <div className='text-sm text-teal-600 my-5 flex gap-1' >
                Vous devez être Connectez pour commenter.
                <Link to={'/sign-in'} className='text-blue-500 hover:underline'>
                 Connecter-vous
                </Link>
            </div>
        )}
        {
          currentUser && (
            <form className='border border-teal-500 rounded-lg p-3 shadow-md' onSubmit={handleSendComment} >
                <textarea maxLength={200} rows={4}
                          onChange={(e) => setComment(e.target.value)}
                          value={comment}
                          placeholder='Ajouter un Commentez...'
                          className={`bg-[#cbc9c927] max-w-2xl w-full p-3 border border-[#8f8d8d7d] rounded-xl
                          outline-none ${comment.length===200&& 'border-[#e2366d] '}`}
                />
                <div className='flex justify-between items-center mt-3' >
                    <p className='text-gray-500 text-xs' >{200 - comment.length} caractères restant</p>
                    <ButtonBase className='envoi_btn' type='submit'>
                        Envoyer
                    </ButtonBase>
                </div>
                {
                 commentError &&
                    <Alert className='mt-5' color='error' icon={<MdError/>} >{commentError}</Alert>
                }
            </form>
           
          )
        }

        {/*pour afficher les différents commentaires */}
        {
         showComments.length === 0 ? (
           <p className='text-sm my-5' >Pas encore des commentaires!</p>
         ) : (
            <div className='' >
             //je suis ici

            </div>
         )}
    </div>
  )
}

export default CommentSection
