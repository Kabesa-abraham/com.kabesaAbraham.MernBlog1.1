import {BrowserRouter,Routes,Route} from 'react-router-dom'
import Home from './Pages/Home';
import About from './Pages/About';
import SignIn from './Pages/SignIn';
import SignUp from './Pages/SignUp';
import Projects from './Pages/Projects';
import Dashboard from './Pages/Dashboard';
import Header from './Components/Header/Header';
import Footer from './Components/footer/Footer';
import OnlyAdminPrivateRoute from './Components/privateRoute/OnlyAdminPrivateRoute';
import CreatePost from './Pages/CreatePost';
import PrivateRoute from './Components/privateRoute/PrivateRoute';
import UpdatePost from './Pages/UpdatePost';
import PostPage from './Pages/PostPage';
import ScrollToTop from './Components/ScrollToTop';

function App() {
  return (
   <BrowserRouter>
      <ScrollToTop/>
       <Header/>
    <Routes>
      <Route path='/' element={<Home/>} />
      <Route path='/about' element={<About/>} />
      <Route path='/sign-in' element={<SignIn/>} />
      <Route path='/sign-up' element={<SignUp/>} />
      <Route path='/projects' element={<Projects/>} />

      <Route element={<PrivateRoute/>} > {/*va me permettre de mettre ce composant privé */}
        <Route path='/dashboard' element={<Dashboard/>} /> {/*ce ci est sont enfant */}
      </Route>

      <Route element={<OnlyAdminPrivateRoute/>}>
        <Route path='/create-post' element={<CreatePost/>} />
        <Route path='/update-post/:postId' element={<UpdatePost/>} />  {/*va s'afficher en fonction de l'id du Post*/}
      </Route>

      <Route path='/post/:postSlug' element={<PostPage/>} />

    </Routes>
       <Footer/>
   </BrowserRouter>
  )
}


export default App;