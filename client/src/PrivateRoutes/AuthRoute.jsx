import AuthStore from '@/store/AuthStore'
import React from 'react'
import { Navigate} from 'react-router-dom'

function AuthRoute({children}) {
    const { UserInfo}= AuthStore()
    let isAuthenticate =  !!UserInfo;
    return (
        isAuthenticate ?  <Navigate to='/chat'/> : children
      )
}

export default AuthRoute