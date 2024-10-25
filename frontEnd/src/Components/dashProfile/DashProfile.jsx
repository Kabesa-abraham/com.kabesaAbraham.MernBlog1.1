import React from 'react'
import './dashProfile.css'
import imgprofileForTest from '../../assets/user_1728405613943.jpg'
import { useSelector } from 'react-redux'
import { Button } from '@mui/material'

const DashProfile = () => {

  const {currentUser} = useSelector(state => state.user); // pour prendre les info du user en sachant que celle-ci est persistant

  return (
    <div className='w-[80%] mx-auto p-3 md:px-[7%] lg:px-[20%] dashproContainer' >
       <h1 className='my-7 text-center font-semibold text-3xl' >Mon Profile</h1>
       <form className='flex flex-col gap-5' >
         <div className='w-32 h-32 self-center cursor-pointer shadow-md overflow-hidden rounded-full' >
            <img src={imgprofileForTest} alt="user" 
            className='w-full h-full rounded-[50%] object-cover border-8 border-[lightgray]'
            />  {/*normalement dans image qui se trouve dans  currentUser.profilePicture mais on n'a pas encore achévé cette partie */}
         </div>
      
          <input type="text" id='username' 
                 placeholder='nom utilisateur' 
                 defaultValue={currentUser.username} 
                 className='inputDashPro'
          />
          <input type="email" id='email' 
                 placeholder='exemple@gmail.com' 
                 defaultValue={currentUser.email}
                 className='inputDashPro'
          />
          <input type="password" id='password' 
                 placeholder='mot de passe' 
                 className='inputDashPro'
          />

          <Button type='submit' className='updateButton'  >
            Mettre à jour
          </Button>

          <div className='text-red-500 flex justify-between mt-5' >
            <span className='cursor-pointer' >Supprimer Compte</span>
            <span className='cursor-pointer text-pink-500' >Se Déconnecter</span>
          </div>
       </form>
    </div>
  )
}

export default DashProfile
