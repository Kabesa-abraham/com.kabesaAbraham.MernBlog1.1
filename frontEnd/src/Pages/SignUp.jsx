import React from 'react'
import './Style/sign_in_up.css'
import { Link } from 'react-router-dom'

const SignUp = () => {
  return (
    <div className='min-h-screen mt-20' >
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
            <form className='flex flex-col' >
              
              <div className='fieldcontain' >
                <label htmlFor="username">Votre Nom d'utilisateur</label>
                <input type="text" placeholder="Nom d'utilisateur" id='username'/>
              </div>
              <div className='fieldcontain' >
                <label htmlFor="email">Votre Email</label>
                <input type="email" placeholder="nom@gmail.com" id='email'/>
              </div>
              <div className='fieldcontain' >
                <label htmlFor="password">Votre Mot de passe</label>
                <input type="password" placeholder="Mot de passe" id='password'/>
              </div>
              <button type='submit' 
                      className='bg-gradient-to-r from from-blue-600 via-purple-600 to-pink-500 py-3 hover:bg-gradient-to-l
                                text-white font-semibold rounded-xl mt-4'
               >
                S'INSCRIRE
              </button>

              <div className='flex gap-2 text-sm mt-5 font-semibold ' >
                <span>Vous avez déjà un Compte?</span>
                <Link to='/sign-in' className='text-blue-500 hover:underline' >
                  Connectez vous
                </Link>
              </div>

            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SignUp
