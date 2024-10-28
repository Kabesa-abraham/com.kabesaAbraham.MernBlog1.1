import React, { useEffect, useState } from 'react'
import './dashPost.css'
import {useSelector} from 'react-redux'
import { Button, Table, TableBody, TableCell, TableHead, TableRow } from "@mui/material";
import { AiOutlineDelete,AiOutlineEdit } from "react-icons/ai";
import { Link } from 'react-router-dom'
import imgForReplacePostImg from '../../assets/img2.jpg'
import { titleForPostTab } from '../../assets/text';


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

  return (
    <div
     className='table-auto overflow-x-scroll md:mx-auto p-3 tableContainer'
    >
      { currentUser.isAdmin && userPosts.length > 0 ? 
        (
          <>
            <Table className='atable'>
              <TableHead className={`bg-[#cdcbcb36] ${theme==='dark'&& 'darkModeRow'}`} >
                { titleForPostTab.map((descrip) =>(
                  <TableCell className={`${theme==='dark'&&'darkMode'}`}>{descrip}</TableCell>
                ))}
              </TableHead>

              {
                userPosts.map((post) =>(
                  <TableBody className='divide-y' >
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
                        <span className='text-xl text-red-500 hover:text-red-700 w-full cursor-pointer' >
                          <AiOutlineDelete/>
                        </span>
                      </TableCell>

                      <TableCell>
                        <Link to={`/update-post/${post}`} className='text-xl text-emerald-500 hover:text-teal-700'>
                          <span><AiOutlineEdit/></span>
                        </Link>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                ))
              }
            </Table>
            {
              showMore &&(
                <Button className='voirPlus_btn' onClick={handleShowMore}>
                  Voir Plus
                </Button>
              )
            }
          </>
        ) 
        : (
          <p>Vous n'avez pas des Postes</p>
        )
      }
    </div>
  )
}

export default DashPost
