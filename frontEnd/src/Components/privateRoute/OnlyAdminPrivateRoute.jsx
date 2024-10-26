import React from 'react'
import {useSelector} from 'react-redux'
import { Navigate, Outlet } from "react-router-dom"; //va me permettre de prendre l'enfant du Composant PrivateRoute

const OnlyAdminPrivateRoute = () => {
    const {currentUser} = useSelector(state => state.user);
  return currentUser && currentUser.isAdmin ? <Outlet/> : <Navigate to='/sign-in'/> /*j'ai utilisé ce composant Navigate pour que àa me remène à la page createpost si on est admin */
}

export default OnlyAdminPrivateRoute
