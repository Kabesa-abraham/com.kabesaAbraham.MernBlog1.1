import React, { useState } from 'react'
import './Style/createPost.css'
import { Alert, Button } from '@mui/material'
import { useSelector } from 'react-redux'
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { MdError } from 'react-icons/md';
import {useNavigate} from 'react-router-dom'

const CreatePost = () => {
    const {theme} = useSelector(state => state.theme);

    const [formData , setFormData] = useState({})
    const [publishError,setPublishError] = useState(null)
    const navigate = useNavigate();

    const [fileImg , setFileImg] = useState(null);
    const handleUploadImgviaFirebase = async()=>{
      console.log("vous devez mettre la fonction d'upload image");
    //nous devons mettre la logique pour upload l'image via firebase mais la je ne vais pas encore le faire
    }

    const handleSubmitPost = async(e) =>{
      e.preventDefault();
      try {
        const res = await fetch('/backend/post/create',{
          method:'POST',
          headers:{
            'Content-Type':'application/json',
          },
          body:JSON.stringify(formData)
        })

        const data = await res.json();

        if(!res.ok){
          setPublishError(data.message)
          return
        }
        if(res.ok){
          setPublishError(null)
          navigate(`/post/${data.slug}`)
        }
      } catch (error) {
        setPublishError('Quelque chose ne va pas!')
      }
    }
   
  return (  
    <div className='p-3 max-w-3xl mx-auto min-h-screen postContainer' >
      <h1 className='text-center text-xl md:text-3xl my-3 md:my-7 font-semibold'>Créer un Poste</h1>
      <form className='flex flex-col gap-4' onSubmit={handleSubmitPost}>
        <div className='flex flex-col gap-3 sm:flex-row justify-between' >
            <input type='text' placeholder='Titre...' 
                   required id='title'
                   className='flex-1 p-3 outline-none bg-[#c5c2c238] rounded-lg border border-[#cfcdcd9c]'
                   onChange={(e) => setFormData({...formData, title:e.target.value})}
            />
            <select className='bg-[#c5c2c238] rounded-lg p-3 categorie'
                    onChange={(e) => setFormData({...formData, category:e.target.value})}
             >
              <option value="uncategorized">Selectionnez une Catégorie</option>
              <option value="JavaScript">JavaScript</option>
              <option value="React">React Js</option>
              <option value="ReactNative">React Native</option>
              <option value="Electron">Electron Js</option>
              <option value="Node">Node Js</option>
            </select>
        </div>

        <div className='flex gap-4 items-center justify-between border-2 rounded-lg border-dotted border-[#858282] p-3 overflow-hidden containerImg_select' >
          <input type='file' className={`input_file ${theme==='dark'&& 'text-white'}`} 
                 onChange={(e)=>setFileImg(e.target.files[0])}
          />
          <Button className='upload_btn' onClick={handleUploadImgviaFirebase}>
              Upload Image  
          </Button>
        </div>

        <ReactQuill theme="snow" placeholder='Ecrivez quelque chose....' 
                    className='h-52 md:h-72 mb-12' required
                    onChange={ (value) =>{setFormData({...formData , content:value})} }
        />

        <Button type='submit' className='publish_btn'>
          Publier
        </Button>

        {
          publishError && <Alert className='mt-3' color='error' icon={<MdError/>} >
            {publishError}
          </Alert>
        }
      </form>
    </div>
  )
}

export default CreatePost
