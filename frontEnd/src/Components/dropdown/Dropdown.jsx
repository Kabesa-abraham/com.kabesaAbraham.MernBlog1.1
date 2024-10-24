import React, { useState } from 'react'
import './dropdown.css'

const Dropdown = (props) => {

  const [showOption,setShowOption] = useState(false)
  const handleshow = () =>{
    if(showOption===false){
      setShowOption(true)
    }else{
      setShowOption(false)
    }
  }

  return (
    <div className='relative'>
      <img src={props.src} alt={props.alt} 
           className='w-12 h-12 rounded-[50%] object-cover'
           onClick={handleshow}
       />

      <div className={showOption===false? 'infoUserContainer' : 'infoUserContainer active' } 
           onClick={handleshow} >
        {props.children}
      </div>
    </div>
  )
}

export default Dropdown
