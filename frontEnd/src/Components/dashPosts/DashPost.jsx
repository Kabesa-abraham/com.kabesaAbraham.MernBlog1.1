import React, { useEffect, useState } from 'react'
import './dashPost.css'
import {useSelector} from 'react-redux'
import { Button, Table, TableBody, TableCell, TableHead, TableRow } from "@mui/material";
import { AiOutlineDelete,AiOutlineEdit } from "react-icons/ai";
import { Link } from 'react-router-dom'
import imgForReplacePostImg from '../../assets/img2.jpg'
import { titleForPostTab } from '../../assets/text';
import Swal from 'sweetalert2';
import { FaBoxOpen, FaQuestion } from 'react-icons/fa';

const DashPost = () => {

  const {currentUser} = useSelector(state => state.user);
  const {theme} = useSelector(state => state.theme);
 
  const [userPosts, setUserPosts] = useState([])
  const [showMore,setShowMore] = useState(true) //pour afficher ou pas le bouton 'voir Plus'

  useEffect(() =>{
    const fetchPost = async() =>{
      try {
        const res = await fetch(`/backend/post/getPosts?userId=${currentUser._id}`)
        const data = await res.json();
      
        if(res.ok){
          setUserPosts(data.posts); //car dans notre data on aura posts, totalPosts, lastMonthPosts
          if(data.posts.length < 9){
            setShowMore(false)
          }
        }
      } catch (error) {
        console.log(error.message);
      }
    }

    if(currentUser.isAdmin){
      fetchPost() }
  },[currentUser._id])//ceci se fera seulement si le currentUser._id change

  const handleShowMore = async() =>{
     const startIndex = userPosts.length; //je renvoi la taille actuelle du userPosts qui doit normalement être à 9
     try {
      const res = await fetch(`/backend/post/getPosts?userId=${currentUser._id}&startIndex=${startIndex}`);
      const data = await res.json();

      if(res.ok){
        setUserPosts((prev)=>[...prev , ...data.posts]) //donc je renvoi les postes qui étaient précédemment et j'y met ceux qui on été fetch
        if(data.posts.length < 9){ // si le data.posts.length actuel est < 9 alors on cache le bouton 'voir plus'
          setShowMore(false)
        }
      }

     } catch (error) {
      console.log(error);
     }
  }

  const handleDeletePost = async(postId)=>{ //pour supprimer un poste  il ya un blème
    try {
      const res = await fetch(`/backend/post/deletePost/${postId}/${currentUser._id}`,{
        method:'DELETE',
      })
      const data = await res.json();

      if(!res.ok){
        console.log(data.message)
      }else{
        setUserPosts((prev)=> 
          prev.filter((post) => post._id !== postId) //donc on ne prend que les post donc _id ne pas égal à celle qu'on vient de supprimer
        )
      }
    } catch (error) {
      console.log(error); 
    }
  }
  const mySwalAlert2 = (postId)=>{  //le popup qui va s'afficher lorsque on declenchera le bouton de suppression du user
    Swal.fire({
      icon: "warning",
      position:'center',
      text:"Est-vous sûr de vouloir supprimer cette Poste ?",
      //toast:true,
      showCancelButton:true, 
      cancelButtonText:'Annuler',
      confirmButtonText:'Oui, je suis sûr',
    }).then((res) =>{
      if(res.isConfirmed){
        handleDeletePost(postId);
      }
    })
  }

  return (
    <div
     className='table-auto overflow-x-scroll md:mx-auto p-3 tableContainer'
    >
      { currentUser.isAdmin && userPosts.length > 0 ? 
        (
          <>
            <Table className='atable'>
              <TableHead className={`bg-[#cdcbcb36] ${theme==='dark'&& 'darkModeRow'}`} >
                { titleForPostTab.map((descrip,i) =>(
                  <TableCell key={i} className={`${theme==='dark'&&'darkMode'}`}>{descrip}</TableCell>
                ))}
              </TableHead>

              {
                userPosts.map((post,i) =>(
                  <TableBody key={i} className='divide-y' >
                    <TableRow className={`bg-[#cdcbcb2d] hover:bg-[#cdcbcb63] transition-all  ${theme==='dark'&& 'darkModeRow'}`} >
                      <TableCell className={`${theme==='dark'&&'darkMode'}`} >
                         {new Date(post.updatedAt).toLocaleDateString()}
                      </TableCell>

                      <TableCell>
                        <Link to={`/post/${post.slug}`}>
                          { <img src={post.image? post.image : imgForReplacePostImg} /*mais là il n'y a pas encore d'option pour inserer une image */
                                 alt={post.title} 
                                 className='postImg'
                            />
                          }
                        </Link>
                      </TableCell>

                      <TableCell className='min-w-[30em]'>
                        <Link to={`/post/${post.slug}`} className={`font-medium ${theme==='dark'&&'darkModeTitle'}`} >{post.title}</Link>
                      </TableCell>

                      <TableCell className={`${theme==='dark'&&'darkMode'}`} >{post.category}</TableCell>

                      <TableCell>
                        <span className='text-xl text-red-500 hover:text-red-700 w-full cursor-pointer' 
                              onClick={()=>{ mySwalAlert2(post._id) }}
                        >
                          <AiOutlineDelete/>
                        </span>
                      </TableCell>

                      <TableCell>
                        <Link to={`/update-post/${post._id}`} className='text-xl text-emerald-500 hover:text-teal-700'>
                          <span><AiOutlineEdit/></span>
                        </Link>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                ))
              }
            </Table>
            {
              showMore===true &&(
                <Button className='voirPlus_btn' onClick={handleShowMore}>
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

export default DashPost
