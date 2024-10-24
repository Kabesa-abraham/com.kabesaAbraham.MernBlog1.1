import React from 'react'
import {useSelector} from 'react-redux'
import { Navigate, Outlet } from "react-router-dom"; //va me permettre de prendre l'enfant du Composant PrivateRoute

const PrivateRoute = () => {
    const {currentUser} = useSelector(state => state.user);
  return currentUser ? <Outlet/> : <Navigate to='/sign-in'/> /*j'ai utilisé ce composant Navigate pour que àa me remène à la page sign-in */
}

export default PrivateRoute
