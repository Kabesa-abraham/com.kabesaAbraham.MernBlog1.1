import React, { useEffect, useState } from 'react'
import './dashUser.css'
import {useSelector} from 'react-redux'
import { Button, Table, TableBody, TableCell, TableHead, TableRow } from "@mui/material";
import { AiOutlineDelete } from "react-icons/ai";
import imgForReplaceUserImg from '../../assets/img3.png'
import { titleForUsersTab } from '../../assets/text';
import Swal from 'sweetalert2';
import { FaBoxOpen, FaCheck, FaQuestion, FaTimes } from 'react-icons/fa';

const DashUser = () => {

  const {currentUser} = useSelector(state => state.user);
  const {theme} = useSelector(state => state.theme);
 
  const [users, setUsers] = useState([])
  const [showMore,setShowMore] = useState(true) //pour afficher ou pas le bouton 'voir Plus'

  useEffect(() =>{
    const fetchUsers = async() =>{
      try {
        const res = await fetch(`/backend/user/getUsers`)
        const data = await res.json();
      
        if(res.ok){
            setUsers(data.users); //car dans notre data on aura posts, totalPosts, lastMonthPosts
          if(data.users.length < 9){
            setShowMore(false)
          }
        }
      } catch (error) {
        console.log(error.message);
      }
    }

    if(currentUser.isAdmin){
        fetchUsers() }
  },[currentUser._id])//ceci se fera seulement si le currentUser._id change

  const handleShowMore = async() =>{
     const startIndex = users.length; //je renvoi la taille actuelle du userPosts qui doit normalement être à 9
     try {
      const res = await fetch(`/backend/user/getUsers?startIndex=${startIndex}`);
      const data = await res.json();

      if(res.ok){
        setUsers((prev)=>[...prev , ...data.users]) //donc je renvoi les postes qui étaient précédemment et j'y met ceux qui on été fetch
        if(data.users.length < 9){ // si le data.posts.length actuel est < 9 alors on cache le bouton 'voir plus'
          setShowMore(false)
        }
      }

     } catch (error) {
      console.log(error);
     }
  }

  return (
    <div
     className='table-auto overflow-x-scroll md:mx-auto p-3 tableContaineruser'
    >
      { currentUser.isAdmin && users.length > 0 ? 
        (
          <>
            <Table className='atable'>
              <TableHead className={`bg-[#cdcbcb36] ${theme==='dark'&& 'darkModeRow'}`} >
                { titleForUsersTab.map((descrip,i) =>(
                  <TableCell key={i} className={`${theme==='dark'&&'darkMode'}`}>{descrip}</TableCell>
                ))}
              </TableHead>

              {
                users.map((user,i) =>(
                  <TableBody key={i} className='divide-y' >
                    <TableRow className={`bg-[#cdcbcb2d] hover:bg-[#cdcbcb63] transition-all  ${theme==='dark'&& 'darkModeRow'}`} >
                      <TableCell className={`${theme==='dark'&&'darkMode'}`} >
                         {new Date(user.createdAt).toLocaleDateString()}
                      </TableCell>

                      <TableCell>
                          { <img src={user.profilePicture? user.profilePicture : imgForReplaceUserImg} /*mais là il n'y a pas encore d'option pour inserer une image */
                                 alt={user.username} 
                                 className='userImg'
                            />
                          }
                      </TableCell>

                      <TableCell className='min-w-[10em]'>
                        <p className={`font-medium ${theme==='dark'&&'darkModeTitle'}`} >{user.username}</p>
                      </TableCell>

                      <TableCell className={`${theme==='dark'&&'darkMode'}`} >{user.email}</TableCell>

                      <TableCell className={`${theme==='dark'&&'darkMode'}`} >
                        {user.isAdmin ? <FaCheck className='text-green-500' />
                          : <FaTimes className='text-red-500' />
                        }
                    </TableCell>

                      <TableCell>
                        <span className='text-xl text-red-500 hover:text-red-700 w-full cursor-pointer' 
                              onClick={()=>{ mySwalAlert3(user._id) }}
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
              showMore &&(
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

export default DashUser
