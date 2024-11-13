import React from 'react'
import CalltoAction from '../Components/callToAction/CalltoAction'

const Projects = () => {
  return (
    <div className='min-h-screen max-w-3xl mx-auto flex flex-col items-center justify-center gap-5 text-center ' >
      <h1 className='text-3xl lg:text-5xl font-semibold' >Projets</h1>
      <p className='text-gray-500' >Developper des projets fun et engageant en apprenant le HTML, CSS, JavaScript, React etc...; </p>
      <CalltoAction/>
    </div>
  )
}

export default Projects
