import React, { useEffect, useRef, useState } from 'react'
import './dashProfile.css'
import { useSelector } from 'react-redux'
import { Alert, Button, CircularProgress, } from '@mui/material'
import { updateStart,updateFaillure,updateSuccess,
         deleteUserFaillure,deleteUserStart,deleteUserSuccess,
         signOutSuccess
        } from '../../redux/user/userSlice'
import { useDispatch } from 'react-redux'
import { MdError } from 'react-icons/md'
import {Link} from 'react-router-dom'
import Swal from 'sweetalert2'

const DashProfile = () => { 

  const {currentUser,error,loading} = useSelector(state => state.user); // pour prendre les info du user en sachant que celle-ci est persistant
 
  const [formdata,setFormdata] = useState({})  //ce ici que sera stocké tout les données à envoyé
  const [updateUserSuccess , setUpdateUserSuccess] = useState(null)
  const [updateUserError , setUpdateUserError] = useState(null)
  const dispatch = useDispatch();

  const handleChangeForm = (e) =>{
    setFormdata({...formdata, [e.target.id] : e.target.value})
  }

  //pour l'image
  const [uploadImage,setUploadImage] = useState(null)
  const [imageUrl,setImageUrl] = useState(null)
  const filepickImg = useRef()
  const handleChangeImge = (e) =>{
    const file = e.target.files[0];
    if(file){
      setUploadImage(file);
      setImageUrl(URL.createObjectURL(file)) //j'ai fait ça car l'img en lui ne peut pas être affiché comme ça dans ce contexte
    }
  }
 
  useEffect(() =>{  //pour upload image
    if(uploadImage){
      uploadTheImage();
    }
  },[imageUrl]) //donc ce useEffect va s'éxecuter si il ya un changement de cette état imageUrl

  const uploadTheImage = async() =>{ //fonction d'upload image
    const formdataImg = new FormData();
    formdataImg.append('image',uploadImage)

    try {
      const res = await fetch('/backend/upload/upload_image',{
        method:'POST',
        headers:{
          Accept:'application/json'
        },
        body:formdataImg
      })
      const data = await res.json();
      if(!res.ok){
        console.log(data.message)
      }
      if(res.ok){
        setFormdata({...formdata , profilePicture:data.image_url})
      }  
    } catch (error) {
      console.log(error)
    }
  }

  const handleUpdateUser = async(e) =>{  //fonction pour mettre à jour un user
    e.preventDefault();
    setUpdateUserError(null);
    setUpdateUserSuccess(null);

    if(Object.keys(formdata).length === 0){ //donc si il n'ya rien dans formdata
      setUpdateUserError("Aucun changement n'a été fait")
      return;
    }
    try {
      dispatch(updateStart());

      const res = await fetch(`/backend/user/update/${currentUser._id}`,{//j'envois l'_id du user que j'ai fait persister grâce à redux-persist
        method:'PUT',
        headers:{'Content-Type': 'application/json'},
        body:JSON.stringify(formdata)
      })

      const data = await res.json();
      if(!res.ok){
        dispatch(updateFaillure(data.message))
        setUpdateUserError(data.message)
      }else{
        dispatch(updateSuccess(data))
        setUpdateUserSuccess('Profile Utilisateur mise à jour avec succée!')
      }
      
    } catch (error) {
      dispatch(updateFaillure(error.message))
      setUpdateUserError(error.message)
    }
  }

  const handleDeleteUser = async() =>{ //pour supprimer le compte
      try {
        dispatch(deleteUserStart())

        const res = await fetch(`/backend/user/delete/${currentUser._id}`,{
          method:'DELETE'
        })
        const data = await res.json();

        if(!res.ok){
          dispatch(deleteUserFaillure(data.message))
        }else{
          dispatch(deleteUserSuccess(data))
        }
        
      } catch (error) {
        dispatch(deleteUserFaillure(error.message))}  
  }
  const mySwalAlert1 = ()=>{  //le popup qui va s'afficher lorsque on declenchera le bouton de suppression du user
    Swal.fire({
      icon: "warning",
      position:'center',
      text:"Est-vous sûr de vouloir supprimer ce Compte ?",
      toast:true,
      showCancelButton:true, 
      cancelButtonText:'Annuler',
      confirmButtonText:'Oui, je suis sûr',
    }).then((res) =>{
      if(res.isConfirmed){
        handleDeleteUser();
      }
    })
  }

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
    <div className='w-[80%] mx-auto p-3 md:px-[7%] lg:px-[20%] dashproContainer' >
       <h1 className='my-7 text-center font-semibold text-3xl' >Mon Profile</h1>
       <form className='flex flex-col gap-5' onSubmit={handleUpdateUser} >

         <input type="file" accept='image/*' onChange={handleChangeImge} ref={filepickImg} hidden/>
         <div className='w-32 h-32 self-center cursor-pointer shadow-md overflow-hidden rounded-full' onClick={()=>filepickImg.current.click()} >
            <img src={imageUrl || currentUser.profilePicture} alt="user" 
            className='w-full h-full rounded-[50%] object-cover border-8 border-[lightgray]'/>  {/*normalement dans image qui se trouve dans  currentUser.profilePicture mais on n'a pas encore achévé cette partie */}
         </div>
      
          <input type="text" id='username' 
                 placeholder='nom utilisateur' 
                 defaultValue={currentUser.username} 
                 className='inputDashPro'
                 onChange={handleChangeForm}
          />
          <input type="email" id='email' 
                 placeholder='exemple@gmail.com' 
                 defaultValue={currentUser.email}
                 className='inputDashPro'
                 onChange={handleChangeForm}
          />
          <input type="password" id='password' 
                 placeholder='mot de passe' 
                 className='inputDashPro'
                 onChange={handleChangeForm}
          />

          <Button type='submit' className='updateButton' disabled={loading} > {/*on va aussi faire le disabled pour quand l'image s'upload */}
            { loading ? (
              <>
                <CircularProgress size={25} className='circularprogress'/>
                <span className='lowercase text-sm text-white' >En attente...</span>
              </>
              ) : " Mettre à jour"
            }
          </Button>

          { //ce bouton s'afficher seulement si on est un administrateur
             currentUser.isAdmin=== true && (
             <Link to={'/create-post'}>
              <Button type='button' className='postbutton' >
                Créer un Poste
              </Button>
             </Link> )
          }

          <div className='text-red-500 flex justify-between mt-5' >
            <span className='cursor-pointer' onClick={()=>mySwalAlert1()} >Supprimer Compte</span>
            <span className='cursor-pointer text-pink-500' onClick={handleSignOut}>Se Déconnecter</span>
          </div>
       </form>
       {
        updateUserSuccess &&
        <Alert className='mt-5' color='success' >
          {updateUserSuccess}
        </Alert>
       }
       {
        updateUserError &&
        <Alert className='mt-5' color='error' icon={<MdError/>} >
          {updateUserError}
        </Alert>
       }
        {
        error &&
        <Alert className='mt-5' color='error' icon={<MdError/>} >
          {error}
        </Alert>
       }
    </div>
  )
}

export default DashProfile
