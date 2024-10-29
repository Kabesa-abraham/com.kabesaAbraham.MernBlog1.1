import React, { useEffect, useState } from 'react'
import './dashSidebar.css'
import {HiUser,HiArrowSmRight, HiDocumentReport, HiOutlineUserGroup} from 'react-icons/hi'
import { Link, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { signOutSuccess } from '../../redux/user/userSlice';
import { useSelector } from 'react-redux';

const DashSidebar = () => {

  const location = useLocation();
  const [tab,setTab] = useState('');
  useEffect(() =>{  //ceci va me permettre de rechercher dans mon url la valeur de tab
    const urlParams = new URLSearchParams(location.search);
    const tabFromUrl = urlParams.get('tab');
    if(tabFromUrl){  // donc si après recherche il ya vraiment un tab(valeur) alors on le met dans le state
      setTab(tabFromUrl)
    }
  },[location.search])

  const dispatch = useDispatch();
  const handleSignOut = async() =>{ //Pour que le user se déconnecte
    try {
      const res = await fetch('/backend/user/signOut' , {
        method:'POST'
      })
      const data = await res.json();

      if(!res.ok){
        console.log(data.message)
      }else{
        dispatch(signOutSuccess())
      }
    } catch (error) { console.log(error.message)}
  }

  const {currentUser} = useSelector(state =>state.user)

  return (
    <div className='bg-[#ffffff0f] px-4 py-3 border-b border-[#66606048] md:border-r  h-full ' >
      <div className='flex items-center md:items-stretch justify-around md:flex-col md:gap-2' >
         <Link to='/dashboard?tab=profile' >
            <div className={tab==='profile'? 'profile_btn activer' : 'profile_btn'} > 
              <span className='flex gap-2 items-center text-[15px] md:text-xl font-semibold' >
                <HiUser/>
                <p className='op_text mr-2' >Profile</p>
              </span>
              <p className='bg-[#0f073c] text-white text-[10px] md:text-[13px] rounded-[15px] py-1 px-2' >
                {
                  currentUser.isAdmin? "Admin" : "Utilisateur"
                }
              </p>
            </div>
          </Link>

          {
            currentUser.isAdmin &&
            <Link to={`/dashboard?tab=posts`} >
              <div className={`side_btn ${tab==='posts'&& 'activer'}`} >
                <HiDocumentReport />
                <p  className='op_text'>postes</p>
              </div>
            </Link>
          }

          {
            currentUser.isAdmin &&
            <Link to={`/dashboard?tab=users`} >
              <div className={`side_btn ${tab==='users'&& 'activer'}`} >
                <HiOutlineUserGroup />
                <p  className='op_text'>Utilisateurs</p>
              </div>
            </Link>
          }

          <div className='hidden md:flex md:gap-2 md:items-center md:px-4 md:py-3 md:rounded-md 
                          md:cursor-pointer md:text-lg font-semibold hover:bg-[#afacac3b]  transition-all' onClick={handleSignOut}>
            <HiArrowSmRight className='text-lg md:text-2xl'/>
            <p  className='op_text'>Se Déconnecter</p>
          </div>
      </div>
    </div>
  )
}

export default DashSidebar
