import React, { useState } from 'react'
import './Style/sign_in_up.css'
import { Link,useNavigate } from 'react-router-dom'
import { Alert, Button,CircularProgress } from '@mui/material'
import { MdError } from "react-icons/md";
import Oauth from '../Components/oauthgoogle/Oauth';

const SignUp = () => {

  const [formData,setFormData] = useState({}) //ce useState va récuperer les differents valeur des champs
  const [errorMessage, setErrorMessage] = useState(null) // ceci va être utilisé si vous avez une erreur
  const [loading, setLoading] = useState(false) // ceci va nous permettre de faire un effet d'attente
  const navigate = useNavigate();

  const handleChange = (e) =>{  //cette fonction va me permettre de prendre les valeurs de mes différents champs
    setFormData({...formData , [e.target.id] : e.target.value.trim()}) // ici j'ai utilisé l'id mais on peut aussi utiliser l'attribut name
  }

  const handleSubmit = async(e) => {
    e.preventDefault();

    if(!formData.username || !formData.email || !formData.password){
      return setErrorMessage("S'il vous plait remplissez tout les champs")
    }

    try{
      setLoading(true)

      setErrorMessage(null) //pour nettoyer cette state
      const res =  await fetch('/backend/auth/signup' ,{
        method:'POST',
        headers:{ "Content-Type" : 'application/json' },
        body: JSON.stringify(formData)
      })
      const data = await res.json();

      if(data.success === false){ //cette erreur va s'afficher si les données sont déjà existant dans la base de données
        return setErrorMessage(data.message);
      }

      setLoading(false)

      if(res.ok){ // si tout va très bien alors on va aller à la page sign in
        navigate('/sign-in')
      }

    }catch(error){
      setErrorMessage(error.message)
      setLoading(false)
    }
  }
//-----------------------------------------------------------------------------------------------------------------------------------------------

  return (
    <div className='min-h-screen mt-20 theContainer' >
      <div className='flex p-3 max-w-5xl mx-auto flex-col md:flex-row md:items-center gap-8' >
        {/*left side*/}
        <div className='flex-1' >
          <Link to="/" className=' font-bold text-4xl' >
            <span className='px-2 py-1 bg-gradient-to-r from-blue-600 via-indigo-600 to-pink-500 text-white
              rounded-lg 
            ' >Abram's</span>Blog
          </Link>
          <p className='text-sm font-semibold mt-5' >
            Ceci est mon Blog (Kabesa Yebula). Vous pouvez vous inscrire via votre Email et mot de passe ou
            via votre Compte google
          </p>
        </div>

        {/*right side */}
        <div className='flex-1' >
          <div>
            <form className='flex flex-col' onSubmit={handleSubmit} >
              
              <div className='fieldcontain' >
                <label htmlFor="username">Votre Nom d'utilisateur</label>
                <input type="text" placeholder="Nom d'utilisateur" id='username' onChange={handleChange}/>
              </div>

              <div className='fieldcontain' >
                <label htmlFor="email">Votre Email</label>
                <input type="email" placeholder="nom@gmail.com" id='email' onChange={handleChange}/>
              </div>

              <div className='fieldcontain' >
                <label htmlFor="password">Votre Mot de passe</label>
                <input type="password" placeholder="Mot de passe" id='password' onChange={handleChange}/>
              </div>

              <Button className='bg-gradient-to-r from from-blue-600 via-purple-600 to-pink-500 signup_btn' type='submit' disabled={loading}> {/*J'ai désactiver le bouton lorque le loading est true */}
                { loading ? (
                    <>
                      <CircularProgress size={25} className='circularprogress'/>
                      <span className='lowercase text-sm text-white' >En attente...</span>
                    </>
                  ) : "Créer Compte"
                }
              </Button>
              <Oauth className='google_btn'/>
            </form>

            <div className='flex gap-2 text-sm mt-5 font-semibold ' >
              <span>Vous avez déjà un Compte?</span>
              <Link to='/sign-in' className='text-blue-500 hover:underline' >
                 Connectez vous
              </Link>
            </div>

            {
              errorMessage && (  /*cette alert va apparaitre si vous n'avez une erreur selon la logique de la fonction mis ci-haut */
                <Alert className='mt-5' color='error' icon={<MdError/>} >
                  {errorMessage}
                </Alert>)
            }

          </div>
        </div>
      </div>
    </div>
  )
}

export default SignUp
