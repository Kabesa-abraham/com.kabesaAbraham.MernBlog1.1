import React, { useState } from 'react'
import './Style/createPost.css'
import { Alert, Button, CircularProgress } from '@mui/material'
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
    const [uploadError, setUploadError] = useState(null);
    const [uploadLoading, setUploadLoading] = useState(false);

    const handleUploadImg = async()=>{  //pour upload l'image
      const formdataImg = new FormData();
      formdataImg.append('image', fileImg);

      if(fileImg === null){
        setUploadError('vous devez sélectionner une image')
      }else{
      try {
        setUploadError(null);
        setUploadLoading(true)
        const res = await fetch('/backend/upload/upload_image',{
          method:'POST',
          headers:{ Accept: 'application/json'},
          body:formdataImg
        })
        const data = await res.json();

        if(!res.ok){
         setUploadError(data.message)
         setUploadLoading(false)
        }
        if(res.ok){
          setFileImg(data.image_url)
          setFormData({...formData , image:data.image_url})
          setUploadLoading(false)
        }

      } catch (error) {
        setUploadError("Echec de chargement de l'image")
        setUploadLoading(false)
      }
    }}

    const handleSubmitPost = async(e) =>{ //pour poster le poste
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
          return;
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
          <Button className='upload_btn' onClick={handleUploadImg} disabled={uploadLoading} >
          { uploadLoading ? (
                    <>
                      <CircularProgress size={25} style={{marginRight:'7px'}}/>
                      <span className='lowercase text-sm text-white' >En attente...</span>
                    </>
                  ) : "Upload Image"
                }
          </Button>
        </div>
        {
          formData.image && (
            <img src={formData.image} alt="" className='max-h-[200px] md:max-h-[400px] object-cover'/>
          )
        }
        {
          uploadError && <Alert className='mt-3' color='error' icon={<MdError/>} >
          {uploadError}
          </Alert>
        }

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
