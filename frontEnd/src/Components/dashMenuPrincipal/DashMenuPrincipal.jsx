import React, { useEffect, useState } from 'react'
import './dashMenuprincipal.css'
import {useSelector} from 'react-redux'
import {Link} from 'react-router-dom'
import { HiAnnotation, HiArrowNarrowUp, HiClipboardList, HiOutlineUserGroup } from "react-icons/hi";
import { Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material';

const DashMenuPrincipal = () => {

    const {currentUser} = useSelector(state => state.user)
    const {theme} = useSelector(state => state.theme)

    const [users,setUsers] = useState([]);
    const [comments,setComment] = useState([]);
    const [posts,setPosts] = useState([]);
    const [totalUsers,setTotalUsers] = useState(0);
    const [totalComments,setTotalComments] = useState(0);
    const [totalPosts,setTotalPosts] = useState(0);
    const [lastMonthUsers,setLastMonthUsers] = useState(0);
    const [lastMonthComments,setLastMonthComments] = useState(0);
    const [lastMonthPosts,setLastMonthPosts] = useState(0);

    useEffect(() =>{
        const fetchUsers = async() =>{  //pour les users
            try {
             const res = await fetch(`/backend/user/getUsers?limit=6`)
             const data = await res.json();
                if(res.ok){
                    setUsers(data.users)
                    setTotalUsers(data.totalUsers)
                    setLastMonthUsers(data.lastMonthUsers)
                }
            } catch (error) {
                console.log(error.message)
            }
        }

        const fetchPosts = async() =>{ //pour les postes
            try {
                const res = await fetch(`/backend/post/getPosts?limit=6`)
                const data = await res.json();
                   if(res.ok){
                       setPosts(data.posts)
                       setTotalPosts(data.totalPostes)
                       setLastMonthPosts(data.lastMonthPostes)
                   }
            } catch (error) {
                console.log(error.message)
            }
        }

        const fetchComments = async() =>{  //pour les comments
            try {
                const res = await fetch(`/backend/comment/getComments?limit=6`)
                const data = await res.json();
                   if(res.ok){
                       setComment(data.comments)
                       setTotalComments(data.totalComments)
                       setLastMonthComments(data.lastMonthComments)
                   }
            } catch (error) {
                console.log(error.message)
            }
        }

        if(currentUser.isAdmin){ //va s'éxecuter seulement si currentUser est Admin
            fetchUsers();
            fetchPosts();
            fetchComments();
        }
    }, [currentUser])

  return (
    <div className='p-3 md:mx-auto tableuserContainer max-w-[1220px]' >
      <div className='flex flex-wrap justify-center gap-5' >

      <div className={`flex flex-col p-3 gap-4 w-full md:w-96  rounded-md shadow-md ${theme==='dark'&&'bg-slate-800'} `}>
        <div className='flex flex-col justify-between' >
            <div className='flex justify-between mb-5' >
                <div>
                    <h3 className='text-gray-500 text-lg uppercase' >Total Utilisateurs</h3>
                    <p className='text-2xl font-semibold' >{totalUsers}</p>
                </div>
                <HiOutlineUserGroup className='bg-gradient-to-r from-indigo-500 to-pink-500 text-white rounded-full
                 text-5xl p-2 shadow-lg' />
            </div>
            <div className='flex gap-3 text-sm' >
              <span className='text-pink-600 flex items-center' >
                <HiArrowNarrowUp className='-rotate-45' />
                {lastMonthUsers}
              </span>
              <div className='text-gray-500' >Dernier Mois</div>
            </div>
        </div>
      </div>

      <div className={`flex flex-col p-3 gap-4 w-full md:w-96 rounded-md shadow-md ${theme==='dark'&&'bg-slate-800'} `}>
        <div className='flex flex-col justify-between' >
            <div className='flex justify-between mb-5' >
                <div>
                    <h3 className='text-gray-500 text-lg uppercase' >Total Postes</h3>
                    <p className='text-2xl font-semibold' >{totalPosts}</p>
                </div>
                <HiClipboardList className='bg-violet-600 text-white rounded-full
                 text-5xl p-2 shadow-lg' />
            </div>
            <div className='flex gap-3 text-sm' >
              <span className='text-pink-600 flex items-center' >
                <HiArrowNarrowUp className='-rotate-45' />
                {lastMonthPosts}
              </span>
              <div className='text-gray-500' >Dernier Mois</div>
            </div>
        </div>
      </div>

      <div className={`flex flex-col p-3 gap-4 w-full md:w-96 rounded-md shadow-md ${theme==='dark'&&'bg-slate-800'} `}>
        <div className='flex flex-col justify-between' >
            <div className='flex justify-between mb-5' >
                <div>
                    <h3 className='text-gray-500 text-lg uppercase' >Total Commentaires</h3>
                    <p className='text-2xl font-semibold' >{totalComments}</p>
                </div>
                <HiAnnotation className='bg-pink-500 text-white rounded-full
                 text-5xl p-2 shadow-lg' />
            </div>
            <div className='flex gap-3 text-sm' >
              <span className='text-pink-600 flex items-center' >
                <HiArrowNarrowUp className='-rotate-45' />
                {lastMonthComments}
              </span>
              <div className='text-gray-500' >Dernier Mois</div>
            </div>
        </div>
      </div>

     </div>

     <div className='flex flex-wrap justify-center gap-5 py-5 w-full  mx-auto' >
      
        <div className={`overflow-x-auto flex flex-col md:m-auto shadow-md p-4 w-full lg:w-[587px] rounded-md ${theme==='dark'&&'bg-gray-800'} `}>
          <div className='flex justify-between p-3 text-lg font-semibold' >
            <h1 className='text-center p-2' >Utilisateurs Recents</h1>
            <Link to={'/dashboard?tab=users'} >
              <button className={`btn bg-transparent hover:bg-gradient-to-r from-indigo-600 to-pink-600 hover:text-white hover:border-none transition-all
                border-[3px] border-pink-600 ${theme==='dark'&&'text-white'}`}>
                  Voir Tout
              </button>
            </Link>
          </div>

          <table className="table">
            {/* head */}
            <thead className='bg-[#7d7d7f1d]' >
              <tr className={`text-sm ${theme==='dark'&&'text-white'}`} >
                <th>Profile Img</th>
                <th>Nom Utilisateur</th>
              </tr>
            </thead>
            <tbody>
              {/* row */}
            {
              users && users.map((item,i) =>(
                <tr  className={`bg-white hover:bg-[#cdcbcb63] transition-all ${theme==='dark'&& 'tableRow'}`} >
                  <td>
                    <img src={item.profilePicture} alt="" 
                                className='w-10 h-10 rounded-full bg-gray-300'
                    />  
                  </td>
                  <td >{item.username}</td>
                </tr>
              ))
            }      
            </tbody>
          </table>
      </div>

        <div className={`overflow-x-auto flex flex-col md:m-auto shadow-md p-4 w-full lg:w-[587px] rounded-md ${theme==='dark'&&'bg-gray-800'} `}>
        <div className='flex justify-between p-3 text-lg font-semibold' >
          <h1 className='text-center p-2' >Commentaires Recents</h1>
          <Link to={'/dashboard?tab=comments'} >
            <button className={`btn bg-transparent hover:bg-gradient-to-r from-indigo-600 to-pink-600 hover:text-white hover:border-none transition-all
              border-[3px] border-pink-600 ${theme==='dark'&&'text-white'}`}>
                Voir Tout
            </button>
          </Link>
        </div>

        <table className="table">
          {/* head */}
          <thead className='bg-[#7d7d7f1d]' >
            <tr className={`text-sm ${theme==='dark'&&'text-white'}`} >
              <th>Contenus</th>
              <th>Nbr Like</th>
            </tr>
          </thead>
          <tbody>
            {/* row */}
          {
            comments && comments.map((item,i) =>(
              <tr  className={`bg-white hover:bg-[#cdcbcb63] transition-all ${theme==='dark'&& 'tableRow'}`} >
                <td><p className={`line-clamp-2`}>{item.content}</p></td>
                <td className='text-lg text-center py-3' >{item.numberOfLikes}</td>
              </tr>
            ))
          }      
          </tbody>
        </table>
      </div>

      <div className={`overflow-x-auto flex flex-col md:m-auto shadow-md p-4 w-full lg:w-[587px] rounded-md ${theme==='dark'&&'bg-gray-800'} `}>
        <div className='flex justify-between p-3 text-lg font-semibold' >
          <h1 className='text-center p-2' >Postes Recents</h1>
          <Link to={'/dashboard?tab=posts'} >
            <button className={`btn bg-transparent hover:bg-gradient-to-r from-indigo-600 to-pink-600 hover:text-white hover:border-none transition-all
              border-[3px] border-pink-600 ${theme==='dark'&&'text-white'}`}>
                Voir Tout
            </button>
          </Link>
        </div>

        <table className="table">
          {/* head */}
          <thead className='bg-[#7d7d7f1d]' >
            <tr className={`text-sm ${theme==='dark'&&'text-white'}`} >
              <th>Poste img</th>
              <th>Poste titre</th>
              <th>Catégory</th>
            </tr>
          </thead>
          <tbody>
            {/* row */}
          {
            posts && posts.map((item,i) =>(
              <tr  className={`bg-white hover:bg-[#cdcbcb63] transition-all ${theme==='dark'&& 'tableRow'}`} >
                <td> 
                  <img src={item.image} alt="" 
                          className='w-14 h-10 rounded-md bg-gray-300'
                  />   
                </td>
                <td>{item.title}</td>
                <td>{item.category}</td>
              </tr>
            ))
          }      
          </tbody>
        </table>
      </div>

     </div>

    </div>
  )
}

export default DashMenuPrincipal
