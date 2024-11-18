import { Button } from '@mui/material'
import React from 'react'
import { AiFillGoogleCircle } from 'react-icons/ai'
import { GoogleAuthProvider, signInWithPopup,getAuth } from "firebase/auth";
import { app } from '../../firebase';
import { useDispatch } from 'react-redux';
import { signInSuccess} from '../../redux/user/userSlice';
import { useNavigate } from 'react-router-dom';


const Oauth = ({className}) => {
  const auth = getAuth(app);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleGoogleClick = async () =>{
    const provider = new GoogleAuthProvider();
    provider.setCustomParameters({prompt: 'select_account'})  //va permettre d'afficher toujours un interface pour choisir votre compte si on ne le met ça va afficher seulement un seule et la prochaine fois ça ne va plus s'afficher

    try {
      const resultsFromGoogle = await signInWithPopup(auth, provider);
      
      const res = await fetch('/backend/auth/google', { //pour se connecter au endpoint de google que j'avait cree dans le backend
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: resultsFromGoogle.user.displayName,
          email: resultsFromGoogle.user.email,
          googlePhotoUrl: resultsFromGoogle.user.photoURL
        })
      })

      const data = await res.json();
      console.log(data)
      if(res.ok){
        dispatch(signInSuccess(data))
        navigate('/')
      }

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
