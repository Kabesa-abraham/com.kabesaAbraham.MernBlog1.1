import { Button } from '@mui/material'
import React from 'react'
import { AiFillGoogleCircle } from 'react-icons/ai'
import { GoogleAuthProvider, signInWithPopup,getAuth } from "firebase/auth";
import { app } from '../../firebase';


const Oauth = ({className}) => {
  const auth = getAuth();

  const handleGoogleClick = async () =>{
    const provider = new GoogleAuthProvider();
    provider.setCustomParameters({prompt: 'select_accout'})  //va permettre d'afficher toujours un interface pour choisir votre compte

    try {
      const resultsFromGoogle = await signInWithPopup(auth, provider);
    } catch (error) {
      console.log(error)
    }
  }
  
  return (
        <Button type='button' className={className} onClick={handleGoogleClick}>
            <AiFillGoogleCircle className='text-xl mr-2' />
            Continuer avec Google
        </Button>
  )
}

export default Oauth
