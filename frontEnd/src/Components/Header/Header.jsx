import React, { useEffect, useState } from 'react'
import './header.css'
import { Link } from 'react-router-dom'
import {AiOutlineSearch} from 'react-icons/ai'
import {FaMoon} from 'react-icons/fa'
import {MdClose, MdMenu} from 'react-icons/md'

const Header = () => {

  const [active,setActive] = useState(false)
  const HandleShopOption = () =>{
    if(active === false){
      setActive(true);
    }else{
      setActive(false)
  }}
 const change= () =>{ //je l'ai mis dans les differents options pour cacher la barre des options
  setActive(false)
 }


  return (
   <header className='flex justify-between items-center relative p-3 border-b-2'>

    <Link to="/" className='self-center whitespace-nowrap text-sm sm:text-xl font-semibold' >
      <span className='px-2 py-1 bg-gradient-to-r from-blue-600 via-indigo-600 to-pink-500 text-white
        rounded-lg 
      ' >Abram's</span>Blog
    </Link>

    <form 
      className='bg-gray-100 px-4 py-3 rounded-lg hidden lg:flex items-center search' 
     >
      <input type='text' placeholder='Rechercher...' className='bg-transparent border-none outline-none'/>
      <AiOutlineSearch className='text-xl' />
    </form>
    <button className='w-12 h-10 flex justify-center items-center lg:hidden text-lg search_btn2' >
      <AiOutlineSearch/>
    </button>

    <div className='flex items-center gap-3 md:order-2' >
      <button  className='w-12 h-10 hidden sm:flex justify-center items-center search_btn2' > {/*j'ai aussi mis search_btn2' pour utilisé son style */}
        <FaMoon/>
      </button>

      <Link to='/sign-in' >
        <button 
          className='bg-gradient-to-br from-indigo-700 to-blue-400  
                   text-white font-semibold px-2 py-2 rounded-lg' >
          Se Connecter
        </button>
      </Link>

      {
        active ? <button className='w-11 h-9 flex justify-center items-center md:hidden menu_btn' onClick={HandleShopOption}>
        <MdClose className='text-2xl ' />
        </button> :
        <button className='w-11 h-9 flex justify-center items-center md:hidden menu_btn' onClick={HandleShopOption}>
        <MdMenu className='text-2xl ' />
        </button>
      }
    </div>

    <div className={active?'flex items-center gap-5 option_container' : 'flex items-center gap-5 option_container active'}  >
        <Link to='/' >
          <button className='option_btn' onClick={change}>
            Home
          </button>
        </Link>
        <Link to='/about' >
          <button className='option_btn' onClick={change}>
            About
          </button>
        </Link>
        <Link to='/projects' >
          <button className='option_btn' onClick={change}>
            Projects
          </button>
        </Link>
     </div>

   </header>
  )
}

export default Header
