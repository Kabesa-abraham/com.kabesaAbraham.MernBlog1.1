import React, { useEffect, useState } from 'react'
import './dashComment.css'
import {useSelector} from 'react-redux'
import { Button, Table, TableBody, TableCell, TableHead, TableRow } from "@mui/material";
import { AiOutlineDelete } from "react-icons/ai";
import { titleForCommentTab } from '../../assets/text';
import Swal from 'sweetalert2';
import { FaBoxOpen, FaQuestion } from 'react-icons/fa';

const DashComment = () => {

  const {currentUser} = useSelector(state => state.user);
  const {theme} = useSelector(state => state.theme);
 
  const [comments, setComments] = useState([])
  const [showComments,setShowComments] = useState(true) //pour afficher ou pas le bouton 'voir Plus'

  useEffect(() =>{
    const fetchComments = async() =>{
      try {
        const res = await fetch(`/backend/comment/getComments`)
        const data = await res.json();
      
        if(res.ok){
            setComments(data.comments); //car dans notre data on aura posts, totalPosts, lastMonthPosts
          if(data.comments.length < 9){
            setShowComments(false)
          }
        }
      } catch (error) {
        console.log(error.message);
      }
    }

    if(currentUser.isAdmin){
        fetchComments() }
  },[currentUser._id])//ceci se fera seulement si le currentUser._id change

  const handleShowComments = async() =>{
     const startIndex = comments.length; //je renvoi la taille actuelle du comments qui doit normalement être à 9
     try {
      const res = await fetch(`/backend/comment/getComments?startIndex=${startIndex}`);
      const data = await res.json();

      if(res.ok){
        setComments((prev)=>[...prev , ...data.comments]) //donc je renvoi les postes qui étaient précédemment et j'y met ceux qui on été fetch
        if(data.comments.length < 9){ // si le data.posts.length actuel est < 9 alors on cache le bouton 'voir plus'
           setShowComments(false)
        }
      }

     } catch (error) {
      console.log(error);
     }
  }

  const handleDeleteComment = async(commentId) =>{
    try {
      const res = await fetch(`/backend/comment/deleteComment/${commentId}`,{
        method:'DELETE'
      })
      const data = await res.json();

      if(!res.ok){
        console.log(data.message);
      }
      if(res.ok){
        setComments((prev) => prev.filter((comment) => comment._id !== commentId))
      }
      
    } catch (error) {
      console.log(error)
    }
  }
  const mySwalAlert5 = (commentId) =>{
    Swal.fire({
      icon:'warning',
      position:'center',
      text:'Etes-vous sûr de vouloir supprimer cet commentaire?',
      showCancelButton:true,
      cancelButtonText:'Non, annuler',
      cancelButtonColor:'red',
      confirmButtonText:'Oui, je suis sûr',
    }).then((res)=>{
      if(res.isConfirmed){
        handleDeleteComment(commentId);
      }
    })
  }

  return (
    <div
     className='table-auto overflow-x-scroll md:mx-auto p-3 tableContainercomment'
    >
      { currentUser.isAdmin && comments.length > 0 ? 
        (
          <>
            <Table className='atable'> 
              <TableHead className={`bg-[#cdcbcb36] ${theme==='dark'&& 'darkModeRow'}`} >
                { titleForCommentTab.map((descrip,i) =>(
                  <TableCell key={i} className={`${theme==='dark'&&'darkMode'}`}>{descrip}</TableCell>
                ))}
              </TableHead>

              {
                comments.map((comment,i) =>(
                  <TableBody key={i} className='divide-y' >
                    <TableRow className={`bg-[#cdcbcb2d] hover:bg-[#cdcbcb63] transition-all  ${theme==='dark'&& 'darkModeRow'}`} >
                      <TableCell className={`${theme==='dark'&&'darkMode'}`} >
                         {new Date(comment.updatedAt).toLocaleDateString()}
                      </TableCell>

                      <TableCell className={`font-medium ${theme==='dark'&&'darkModeTitle'}`} >
                          { comment.content }
                      </TableCell>

                      <TableCell className='min-w-[10em]'>
                        <p className={`font-medium ${theme==='dark'&&'darkModeTitle'}`} >{comment.numberOfLikes}</p>
                      </TableCell>

                      <TableCell className={`${theme==='dark'&&'darkMode'}`} >{comment.postId}</TableCell>

                      <TableCell className={`${theme==='dark'&&'darkMode'}`} >
                        {comment.userId }
                      </TableCell>

                      <TableCell>
                        <span className='text-xl text-red-500 hover:text-red-700 w-full cursor-pointer' 
                              onClick={()=>{ mySwalAlert5(comment._id) }}
                         >
                          <AiOutlineDelete/>
                        </span>
                      </TableCell>

                    </TableRow>
                  </TableBody>
                ))
              }
            </Table>
            {
              showComments &&(
                <Button className='voirPlus_btn' onClick={handleShowComments}>
                  Voir Plus
                </Button>
              )
            }
          </>
        ) 
        : (
          <p className='h-full flex flex-col items-center justify-center opacity-50'>
            <FaQuestion className='text-[1.5em] sm:text-[2.5em] lg:text-[5em] '/>
            <FaBoxOpen className='text-[3.5em] sm:text-[5em] lg:text-[10em]' />
          </p>
        )
      }
    </div>
  )
}

export default DashComment
