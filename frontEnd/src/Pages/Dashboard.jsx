import React,{useState,useEffect} from 'react'
import { useLocation } from 'react-router-dom'
import DashSidebar from '../Components/dashSidebar/DashSidebar';
import DashProfile from '../Components/dashProfile/DashProfile';
import DashUser from '../Components/dashUsers/DashUser';
import DashComment from '../Components/dashComments/DashComment';
import DashMenuPrincipal from '../Components/dashMenuPrincipal/DashMenuPrincipal';
import DashPost from '../Components/dashPosts/DashPost';

const Dashboard = () => {

  const location = useLocation();
  const [tab,setTab] = useState('');
  useEffect(() =>{  //ceci va me permettre de rechercher dans mon url la valeur de tab
    const urlParams = new URLSearchParams(location.search);
    const tabFromUrl = urlParams.get('tab');
    if(tabFromUrl){  // donc si après recherche il ya vraiment un tab(valeur) alors on le met dans le state
      setTab(tabFromUrl)
    }
  },[location.search])

  return (
    <div className='flex flex-col md:flex-row w-full min-h-screen'>
      {/*sidebar */}
      <div className='w-full md:w-[20em] '>
        <DashSidebar/>
      </div>

      {/*dashMenuprincipal */}
      {tab === 'dashMenuPrincpal' && <DashMenuPrincipal/>}
      {/*profile ...*/}
      {tab === 'profile' && <DashProfile/>}
      {/*posts */}
      {tab === 'posts' && <DashPost/>}
      {/*users */}
      {tab === 'users' && <DashUser/>}
      {/*comments */}
      {tab === 'comments' && <DashComment/>}
    </div>
  )
}

export default Dashboard
