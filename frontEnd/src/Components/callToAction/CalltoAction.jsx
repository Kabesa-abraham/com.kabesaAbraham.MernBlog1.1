import React from 'react'
import './calltoAction.css'
import pubImg from '../../assets/img4.jpg'
import { ButtonBase } from '@mui/material'

const CalltoAction = () => {
  return (
    <div className='flex flex-col sm:flex-row p-3 border border-teal-500 justify-center items-center  
                    rounded-tl-3xl rounded-br-3xl text-center  calltoAction_container' >
        <div className='flex-1 justify-center flex flex-col gap-3' >
            <h2 className='text-xl md:text-2xl font-semibold' >
                Vous voulez apprendre plus apropo de JavaScript?
            </h2>
            <p className='text-gray-500' >
                Régardez ces Ressources contenant plus de 50 projets JavaScript
            </p>
            <ButtonBase className='btn_project' target='_blank'>
              <a href="#">
                Plus de 50 Projets
              </a>
            </ButtonBase>
        </div>
        <div className='p-7 flex-1'>
            <img src={pubImg} alt="" />
        </div>
    </div>
  )
}

export default CalltoAction
