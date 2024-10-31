import { Button } from '@mui/material'
import React from 'react'
import { AiFillGoogleCircle } from 'react-icons/ai'

const Oauth = ({className}) => {

  //ici on mettra la logique pour se connecter avec notre compte google
  
  return (
        <Button type='button' className={className} >
            <AiFillGoogleCircle className='text-xl mr-2' />
            Continuer avec Google
        </Button>
  )
}

export default Oauth
