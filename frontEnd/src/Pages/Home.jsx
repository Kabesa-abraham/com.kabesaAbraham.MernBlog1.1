import React, { useEffect, useState } from 'react'
import theHand from '../assets/hand_icon.png';
import {Link} from 'react-router-dom'
import CalltoAction from '../Components/callToAction/CalltoAction';
import {useSelector} from 'react-redux'
import PostCart from '../Components/postCart/PostCart';

const Home = () => {
  const {theme} = useSelector(state => state.theme)

  const [postes, setPostes] = useState([]);
  console.log(postes);
  
  useEffect(() => {
    const fetchPostes = async () =>{
      try {
        const res = await fetch('/backend/post/getPosts');
        if(res.ok){
          const data = await res.json();
          setPostes(data.posts);
        } 
      } catch (error) {
        console.log(error)
      }
    }

    fetchPostes();      
  },[])

  return (
    <div>
      <div className='flex flex-col gap-6 p-28 px-3 max-w-6xl mx-auto' >
        <h1 className='flex items-center gap-2 lg:gap-4 text-3xl md:text-4xl lg:text-6xl font-bold' >
           Bienvenue dans mon Blog 
           <img src={theHand} alt="" className='w-20 lg:w-32'/>
        </h1>
        <p className='text-gray-500 text-xs sm:text-sm' >
          Dans ce Blog vous trouverez une variété d'articles parlant du developpement Web,
          d'ingénierie logiciel,des langages de programmation vous permettant ainsi d'avoir des
          connaissances diversifiées en Programmation informatique.
        </p>
        <Link to={`/search`} className='text-xs sm:text-sm text-blue-600 font-bold hover:underline' >
          Voir tout les Postes
        </Link>
      </div>
      <div className={`max-w-7xl p-3 bg-lime-200 mx-auto ${theme==='dark'&&'bg-slate-700'}`}>
        <CalltoAction/>
      </div>

      <div className='max-w-7xl mx-auto p-3 flex flex-col gap-8 py-7' >
        {
          postes && postes.length > 0 &&(
            <div className='flex flex-col gap-6' >
              <h2 className='text-2xl font-semibold text-center' >Postes Récents</h2>
              <div className='flex flex-wrap gap-4 justify-center'>
                {
                  postes.map((item,i) =>(
                    <PostCart key={i} post={item}/>
                  ))
                }
              </div>
            </div>
          )
        }

        <Link to={'/search'} className='text-lg text-teal-500 hover:underline text-center' >
          Voir Tout les Postes
        </Link>

      </div>
    </div>
  )
}

export default Home
