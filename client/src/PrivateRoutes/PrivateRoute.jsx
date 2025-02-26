import AuthStore from '@/store/AuthStore'
import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'

function PrivateRoute({children}) {
    const { UserInfo}= AuthStore()
    let isAuthenticate = !!UserInfo ;
    return (
        isAuthenticate ? children : <Navigate to='/auth'/>
      )
}

export default PrivateRoute