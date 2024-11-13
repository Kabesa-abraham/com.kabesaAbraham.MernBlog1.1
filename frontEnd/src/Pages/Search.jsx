import React, { useEffect, useState } from 'react'
import './Style/search.css'
import { FaFilter } from 'react-icons/fa';
import { useLocation,useNavigate } from "react-router-dom";
import PostCart from '../Components/postCart/PostCart';
import { CircularProgress } from '@mui/material';
import { useSelector } from 'react-redux'

const Search = () => {

  const {theme} = useSelector(state => state.theme)

  const [sidebarData, setSideBarData] = useState({
    searchTerm: '',
    sort: 'desc',
    category:'uncategorized'
  })

  const [posts , setPosts] = useState([]);
  const [loading,setLoading] = useState(false);
  const [showmore,setShowmore] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() =>{
    const urlParams = new URLSearchParams(location.search);
    const searchTermFromUrl = urlParams.get('searchTerm');
    const sortFromUrl = urlParams.get('sort');
    const categoryFromUrl = urlParams.get('category');
    
    if(searchTermFromUrl || sortFromUrl || categoryFromUrl){
      setSideBarData({
        ...sidebarData,  //je met les différents valeurs à leur place
        searchTerm:searchTermFromUrl,
        sort: sortFromUrl,
        category:categoryFromUrl
      })
    }

    const fetchData = async() =>{
      setLoading(true)
      const searchQuery = urlParams.toString();
      const res = await fetch(`/backend/post/getPosts?${searchQuery}`)//je fais la requête
      if(!res.ok){
        setLoading(false)
        return;
      }
      if(res.ok){ //si tout est bon
        const data = await res.json();
        setPosts(data.posts);
        setLoading(false);
        if(posts.length === 9){
          setShowmore(true);
        }
      }

    }
    fetchData();
  }, [location.search])

  const handleChange = (e) =>{
    if(e.target.id === 'searchTerm'){
      setSideBarData({ ...sidebarData, searchTerm: e.target.value })
    }

    if(e.target.id === 'sort'){
      const order = e.target.value || 'desc';  //si le user ne met pas de value alors on le laisse par défaut à desc
      setSideBarData({...sidebarData , sort:order});
    }

    if(e.target.id === 'category'){
      const category = e.target.value || 'uncategorized';  //si le user ne met pas de value alors on le laisse par défaut à desc
      setSideBarData({...sidebarData , category});
    }
  }

  const handleSubmit = (e) =>{ //la fonction
    e.preventDefault();
    const urlParams = new URLSearchParams(location.search);
    urlParams.set('searchTerm', sidebarData.searchTerm);
    urlParams.set('sort', sidebarData.sort);
    urlParams.set('category', sidebarData.category);
    const searchQuery = urlParams.toString();

    navigate(`/search?${searchQuery}`);
  }

  const handleShowMore = async() =>{
    const numberOfPost = posts.length;
    const startIndex = numberOfPost - 1;

    const urlParams = new URLSearchParams(location.search);
    urlParams.set('startIndex',startIndex);
    const searchQuery = urlParams.toString();

    try {
      const res = await fetch(`/backend/post/getPosts?${searchQuery}`)
      if(!res.ok){
        return;
      }
      if(res.ok){
        const data = await res.json();
        setPosts([...posts, ...data.posts])
        if(data.posts.length === 9){ //si ces postes sont encore égale à 9 alors on va encore afficher le bouton
          setShowmore(true);
        }else{
          setShowmore(false);
        }
      }
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className='flex flex-col md:flex-row' >
      <div className='p-7 border-b md:border-r md:min-h-screen border-[#bebcbc92]' >
          <form className='flex flex-col gap-8' onSubmit={handleSubmit} >
            <div className='flex items-center gap-2' >
              <label className='whitespace-nowrap font-semibold ' >Search Term:</label>
              <input type="text" placeholder='Rechercher...' id='searchTerm'
                  value={sidebarData.searchTerm} onChange={handleChange} 
                  className='input input-bordered  bg-[#d4d3d333] hover:border-gray-500'/>
            </div>

            <div className='flex items-center gap-3 ' >
              <label htmlFor="" className='whitespace-nowrap font-semibold '>Sorte:</label>
              <select value={sidebarData.sort}  onChange={handleChange} id='sort' defaultChecked={sidebarData.sort}
                      className='select select-bordered bg-[#d4d3d333] theSelector' >
                <option value="desc">Plus récent</option>
                <option value="asc">Plus ancien</option>
              </select>
            </div>

            <div className='flex items-center gap-3 ' >
              <label htmlFor="" className='whitespace-nowrap font-semibold '>Catégorie:</label>
              <select value={sidebarData.category} onChange={handleChange} id='category'
                      className='select select-bordered bg-[#d4d3d333] theSelector' >
                <option value="uncategorized">uncategorized</option>
                <option value="JavaScript">JavaScript</option>
                <option value="React">React Js</option>
                <option value="ReactNative">React Native</option>
                <option value="Electron">Electron Js</option>
                <option value="Node">Node Js</option>
              </select>
            </div>

            <button type='submit' className={`btn btn-outline border-indigo-500 hover:border-indigo-500
                    hover:bg-gradient-to-r from-indigo-500 to-pink-500 ${theme==='dark'&&'text-white'}`} >
              <FaFilter className='text-xl' /> Filtrage
            </button>

          </form>
      </div>

       <div className='w-full' >
        <h1 className=' text-lg lg:text-3xl font-semibold sm:border-b border-[#9b949463] p-3 mt-5 ' >Resultas Postes</h1>
        <div className='flex flex-wrap p-7 gap-4' >
          {
            !loading && posts.length === 0 && (
              <p className='text-xl lg:text-4xl text-gray-500' >Aucun Poste Trouvé</p>
            )
          }
          {
            loading && (
             <div className='w-full h-full text-center mt-10' >
               <CircularProgress size={40} />
             </div>
            )
          }
          {
            !loading && posts && posts.map((item,i) =>(
              <PostCart post={item} key={i} />
            ))
          }
          {
            showmore && 
            <button onClick={handleShowMore} className='text-teal-600 text-lg w-full hover:underline ' >Voir Plus</button>
          }
        </div>
       </div>

    </div>
  )
}

export default Search
