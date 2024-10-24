import React from 'react'
import {useSelector} from 'react-redux'

const ThemeProvider = ({children}) => {
    const {theme} = useSelector((state) => state.theme);
  return (
    <div className={theme} >
        <div 
            className={theme==='light'? 'bg-white text-gray-700' : 'text-gray-200 bg-[#171b40] min-h-screen'}>
            {children}
        </div>
    </div>
  )
}
export default ThemeProvider
