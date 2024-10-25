import React, { useState } from 'react';
import './header.css';
import { Link } from 'react-router-dom';
import {AiOutlineSearch} from 'react-icons/ai';
import {FaMoon,FaSun} from 'react-icons/fa';
import {MdClose, MdMenu} from 'react-icons/md';
import { Button, ButtonBase} from '@mui/material';
import Dropdown from '../dropdown/Dropdown';
import testProImg from '../../assets/user_1728405613943.jpg';
import {useSelector,useDispatch} from 'react-redux';
import { toggleTheme } from '../../redux/theme/themeSlice';


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

 const {currentUser} = useSelector(state => state.user)
 const dispatch = useDispatch();
 const {theme} = useSelector(state => state.theme)

  return (
   <header className='bg-[#ffffff0f] flex justify-between items-center relative py-3 px-[3%] md:px-[6%] border-b-2 containers'>

    <Link to="/" className='self-center whitespace-nowrap text-sm sm:text-xl font-semibold' >
      <span className='px-2 py-1 bg-gradient-to-r from-blue-600 via-indigo-600 to-pink-500 text-white
        rounded-lg 
      ' >Abram's</span>Blog
    </Link>

    <form 
      className='bg-[#cdcbcb2a] px-4 py-3 rounded-lg hidden lg:flex items-center search'
     >
      <input type='text' placeholder='Rechercher...' className='bg-transparent border-none outline-none'/>
      <AiOutlineSearch className='text-xl' />
    </form>

    <button className='w-12 h-10 flex justify-center items-center lg:hidden text-lg search_btn2' >
      <AiOutlineSearch/>
    </button>

    <div className='flex items-center gap-3 md:order-2' >
      <button  className='w-12 h-10 hidden sm:flex justify-center items-center search_btn2'
               onClick={() => dispatch(toggleTheme())} > {/*j'ai aussi mis search_btn2' pour utilisé son style */}
        {theme==='light'?<FaSun/> : <FaMoon/>}
      </button>

      {
        currentUser ? (
          <Dropdown src={testProImg}>{/*currentUser.profilePicture*/}
              <span className='block text-md' >@{currentUser.username}</span>
              <span className='block text-md font-semibold truncate' >@{currentUser.email}</span>
              <Link to={'/dashboard?tab=profile'}>
                <ButtonBase className={theme==='light'? 'profile_btn':'profile_btn buttondark'}>Profile</ButtonBase>
              </Link>
              <hr />     
                <ButtonBase className={theme==='light'? 'sedecon_btn':'sedecon_btn buttondark'}>Se déconnecter</ButtonBase>
          </Dropdown>
        ) : 
        (
        <Link to='/sign-in' >
          <Button variant='outlined' className='sign_btn' >
            Se Connecter
          </Button>
        </Link>)
      }
      
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
