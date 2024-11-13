import React, { useEffect, useState } from 'react';
import './header.css';
import { Link } from 'react-router-dom';
import {AiOutlineSearch} from 'react-icons/ai';
import {FaMoon,FaSun} from 'react-icons/fa';
import {MdClose, MdMenu} from 'react-icons/md';
import {useSelector,useDispatch} from 'react-redux';
import { toggleTheme } from '../../redux/theme/themeSlice';
import { signOutSuccess } from '../../redux/user/userSlice';
import { useLocation,useNavigate } from 'react-router-dom'


const Header = () => {

  const [active,setActive] = useState(false)
  const HandleShopOption = () =>{
    if(active === false){
      setActive(true);
    }else{
      setActive(false)
  }}
 const change= () =>{ //je l'ai mis dans les differents options pour cacher la barre des options lorque nous sont en mobile
  setActive(false)
 }

 const {currentUser} = useSelector(state => state.user)
 const dispatch = useDispatch();
 const {theme} = useSelector(state => state.theme)

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

const [searchTerm, setSearchTerm] = useState(''); 
const location = useLocation();
const navigate = useNavigate();
useEffect(() =>{ //va me permettre d'écouter la barre de recherche
  const urlParams = new URLSearchParams(location.search); //en mettant search je prends tout ce qui suit après le ?
  const searchTermFromUrl = urlParams.get('searchTerm'); //et je prend le searchTerm
  if(searchTermFromUrl){ //si il ya une value dans ce const on le met dans ce state
    setSearchTerm(searchTermFromUrl); //et je prends la valeur pour le mettre dans ce state
  }
},[location.search]) //ceci s'effectura si le location.search change

const handleSearchTerm = (e) =>{//la fonction pour la barre de recherche
  e.preventDefault();
  const urlParams = new URLSearchParams(location.search);
  urlParams.set('searchTerm',searchTerm); //j'ai dit avec la fonction se que je veux modifier le value de searchTerm
  const searchQuery = urlParams.toString();
  navigate(`/search?${searchQuery}`);
}


  return (
   <header className='bg-[#ffffff0f] flex justify-between items-center relative py-3 px-[3%] md:px-[6%] border-b-2 containers'>

    <Link to="/" className='self-center whitespace-nowrap text-sm sm:text-xl font-semibold' >
      <span className='px-2 py-1 bg-gradient-to-r from-blue-600 via-indigo-600 to-pink-500 text-white
        rounded-lg 
      ' >Abram's</span>Blog
    </Link>

    <form 
      className='bg-[#cdcbcb2a] px-4 py-3 rounded-lg hidden lg:flex items-center search'
      onSubmit={handleSearchTerm}
     >
      <input type='text' placeholder='Rechercher...' 
             className='bg-transparent border-none outline-none' 
             value={searchTerm} onChange={(e)=>setSearchTerm(e.target.value)} />
      <AiOutlineSearch className='text-xl' />
    </form>

    <button className='w-12 h-10 flex justify-center items-center lg:hidden text-lg search_btn2' >
      <AiOutlineSearch/>
    </button>

    <div className='flex items-center gap-3 md:order-2' >
      <button  className='min-w-12 min-h-10 hidden sm:flex justify-center items-center search_btn2'
               onClick={() => dispatch(toggleTheme())} > {/*j'ai aussi mis search_btn2' pour utilisé son style */}
        {theme==='light'?<FaSun/> : <FaMoon/>}
      </button>

      {
        currentUser ? (
          <div className="navbar bg-transparent">
            <div className="flex-none gap-2">
              <div className="dropdown dropdown-end">
                <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                  <div className="w-12 h-12 rounded-full">
                    <img
                      alt={currentUser.username}
                      src={currentUser.profilePicture} className='rounded-full truncate' />
                  </div>
                </div>
                <ul
                  tabIndex={0}
                  className={`menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-60 p-2 shadow
                  flex flex-col gap-1 text-sm ${theme==="dark"&&"bg-[#143961]"}`}
                 >
                  <li className='mb-2' >@{currentUser.username}</li>
                  <li>@{currentUser.email}</li>

                  <Link to={'/dashboard?tab=profile'}>
                    <li >
                      <button className="text-sm p-3 justify-between">
                        Profile
                        <span className="badge">
                          {currentUser.isAdmin? 'admin' : 'user'}
                        </span>
                      </button>
                    </li>
                  </Link>
                  <hr/>
                  <li>
                    <button className='text-sm p-3' onClick={handleSignOut} >déconnexion</button>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        ) : 
        (
        <Link to='/sign-in' >
          <button className='sign_btn' >
            Se Connecter
          </button>
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
