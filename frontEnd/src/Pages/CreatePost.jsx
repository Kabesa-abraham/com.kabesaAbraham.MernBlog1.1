import React from 'react'
import './Style/createPost.css'
import { Button } from '@mui/material'
import { useSelector } from 'react-redux'
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'

const CreatePost = () => {
    const {theme} = useSelector(state => state.theme)
  return (  
    <div className='p-3 max-w-3xl mx-auto min-h-screen postContainer' >
      <h1 className='text-center text-xl md:text-3xl my-3 md:my-7 font-semibold'>Créer un Poste</h1>
      <form className='flex flex-col gap-4'>
        <div className='flex flex-col gap-3 sm:flex-row justify-between' >
            <input type='text' placeholder='Titre...' 
                   required id='title'
                   className='flex-1 p-3 outline-none bg-[#c5c2c238] rounded-lg border border-[#cfcdcd9c] '
            />
            <select className='bg-[#c5c2c238] rounded-lg p-3 categorie' >
              <option value="uncategorized">Selectionnez une Catégorie</option>
              <option value="JavaScript">JavaScript</option>
              <option value="React">React Js</option>
              <option value="ReactNative">React Native</option>
              <option value="Electron">Electron Js</option>
              <option value="Node">Node Js</option>
            </select>
        </div>

        <div className='flex gap-4 items-center justify-between border-2 rounded-lg border-dotted border-[#858282] p-3 overflow-hidden containerImg_select' >
          <input type='file' className={`input_file ${theme==='dark'&& 'text-white'}`}/>
          <Button className='upload_btn'>
              Upload Image  
          </Button>
        </div>

        <ReactQuill theme='snow' placeholder='Ecrivez quelque chose....' 
                    className='h-52 md:h-72 mb-12' required/>
        <Button className='publish_btn'>
          Publier
        </Button>
      </form>
    </div>
  )
}

export default CreatePost
