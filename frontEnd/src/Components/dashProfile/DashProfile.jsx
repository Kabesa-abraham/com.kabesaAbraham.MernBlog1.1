import React, { useEffect, useRef, useState } from 'react'
import './dashProfile.css'
import imgprofileForTest from '../../assets/user_1728405613943.jpg'
import { useSelector } from 'react-redux'
import { Button } from '@mui/material'

const DashProfile = () => {

  const {currentUser} = useSelector(state => state.user); // pour prendre les info du user en sachant que celle-ci est persistant
  
  //pour l'image
  const [uploadImage,setUploadImage] = useState(null)
  const [imageUrl,setImageUrl] = useState(null)
  const filepickImg = useRef()
  const handleChangeImge = (e) =>{
    const file = e.target.files[0];
    if(file){
      setUploadImage(file);
      setImageUrl(URL.createObjectURL(file))
    }
  }

  useEffect(() =>{
    if(uploadImage){
      uploadTheImage()
    }
  },[imageUrl]) //donc ce useEffect va s'éxecuter si il ya un changement de cette état imageUrl
  const uploadTheImage = async() =>{
   //pour cette fonction on aura besoin des services que propose firebase pour upload l'image qu'on aura
   //et du module firebase pour faire tout ça
   //qui va ainsi nous permettre de le mettre dans la BBD 
   console.log("image doesn't upload we need firebase")  
  }

  return (
    <div className='w-[80%] mx-auto p-3 md:px-[7%] lg:px-[20%] dashproContainer' >
       <h1 className='my-7 text-center font-semibold text-3xl' >Mon Profile</h1>
       <form className='flex flex-col gap-5' >

         <input type="file" accept='image/*' onChange={handleChangeImge} ref={filepickImg} hidden/>
         <div className='w-32 h-32 self-center cursor-pointer shadow-md overflow-hidden rounded-full' onClick={()=>filepickImg.current.click()} >
            <img src={imageUrl? imageUrl : imgprofileForTest} alt="user" 
            className='w-full h-full rounded-[50%] object-cover border-8 border-[lightgray]'/>  {/*normalement dans image qui se trouve dans  currentUser.profilePicture mais on n'a pas encore achévé cette partie */}
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
