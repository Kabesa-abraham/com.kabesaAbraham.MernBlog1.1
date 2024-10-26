import React, { useEffect, useState } from 'react'
import './dashSidebar.css'
import {HiUser,HiArrowSmRight} from 'react-icons/hi'
import { Link, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { signOutSuccess } from '../../redux/user/userSlice';

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

  return (
    <div className='bg-[#ffffff0f] px-4 py-3 border-b border-[#66606048] md:border-r  h-full ' >
      <div className='flex justify-around md:flex-col md:gap-2' >
         <Link to='/dashboard?tab=profile' >
            <div className={tab==='profile'? 'profile_btn activer' : 'profile_btn'} > 
              <span className='flex gap-2 items-center text-[15px] md:text-xl font-semibold' >
                <HiUser/>
                <p>Profile</p>
              </span>
              <p className='bg-[#0f073c] text-white text-[10px] md:text-[13px] rounded-[15px] py-1 px-2' >Utilisateur</p>
            </div>
          </Link>

          <div className='deconnect_btn' onClick={handleSignOut}>
            <HiArrowSmRight className='text-lg md:text-2xl'/>
            <p>Se Déconnecter</p>
          </div>
      </div>
    </div>
  )
}

export default DashSidebar
