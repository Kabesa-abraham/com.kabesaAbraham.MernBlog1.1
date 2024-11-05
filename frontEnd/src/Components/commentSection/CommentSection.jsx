import React, { useEffect, useState } from 'react'
import './commentSection.css'
import { useSelector } from 'react-redux'
import profilePicImg from '../../assets/user_1728405613943.jpg'
import { Link } from 'react-router-dom'
import { Alert, ButtonBase } from '@mui/material'
import {MdError} from 'react-icons/md'
import Comments from '../comments/Comments'
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const CommentSection = ({postId}) => {
    const {currentUser} = useSelector(state => state.user) //pour prendre l'utilisateur

    const [comment ,setComment] = useState(''); //pour le nombre de caractères qui sera dans le commentaire
    const [commentError, setCommentError] = useState(null);
    const [showComments, setShowComment] = useState([])
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
                setComment('')// je clear le champ du commentaire
                setCommentError(null)
                setShowComment([data, ...showComments])  
            }
        } catch (error) {
            setCommentError(error.message)
        }  
    }

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
    },[postId]) //ceci sera fait si le postId change ou le si il ya un nouveau comment

    const navigate = useNavigate();
    const handleCommentLike = async(commentId) =>{
        try {
            if(!currentUser){
                navigate('/sign-in');
                return;
            }
            const res = await fetch(`/backend/comment/likeComment/${commentId}`,{
                method:'PUT',
            });

            if(res.ok){
                const data = await res.json();

                setShowComment(showComments.map(comment =>{
                    if(comment._id === commentId){
                        return {
                            ...comment,
                            likes: data.likes,
                            numberOfLikes:data.likes.length,
                        }
                    }
                    return comment;
                } ))
            }
           
        } catch (error) {
            console.log(error)
        }
    }

    const handleEditComment = async(comment, editedContent) =>{ //pour mettre à jour le comment qui se trouve ici par le new comment
        setShowComment(showComments.map(myComment =>{
            if(myComment._id === comment._id){
                return {
                    ...myComment,
                    content: editedContent
            } }
            return myComment;
        } ))
    }

    const handleDeleteComment = async(commentId) =>{
        console.log(commentId)
        try {
            if(!currentUser){
                navigate('/sign-in');
                return
            }
            const res = await fetch(`/backend/comment/deleteComment/${commentId}`,{
                method:'DELETE'
            })

            if(res.ok){
                const data = await res.json();
                setShowComment(
                    showComments.filter((commenter)=> commenter._id !== commentId )
                )
            }
        } catch (error) {
            console.log(error.message)
        }

    }
    const mySwalAlert3 = (commentId)=>{  //le popup qui va s'afficher lorsque on declenchera le bouton de suppression du user
        console.log(commentId , 'pour my swal')
        Swal.fire({
          icon: "warning",
          position:'center',
          text:"Est-vous sûr de vouloir supprimer ce Commentaire ?",
          showCancelButton:true, 
          cancelButtonText:'Annuler',
          confirmButtonText:'Oui, je suis sûr',
        }).then((res) =>{
          if(res.isConfirmed){
            handleDeleteComment(commentId);
          }
        })
      }
    
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
                <>
                <div className='text-sm md:text-lg my-5 flex items-center gap-2' >
                    <p>Commentaires</p>
                    <div className='border border-gray-400 py-1 px-3 md:px-4 rounded-sm' >
                        <p>{showComments.length}</p>
                    </div>
                </div>
                {
                    showComments.map((item,i) =>(
                        <Comments
                        key={i}
                        comment={item}
                        onCommentLike={handleCommentLike}
                        onEditComment = {handleEditComment}
                        HandleDeleteComment= {mySwalAlert3}
                        />
                    ))
                }
                </>
         )}
    </div>
  )
}

export default CommentSection
