
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import './App.css'
import { Toaster } from "@/components/ui/sonner"
import AuthPage from './Pages/Auth/AuthPage'
import ProfilePage from './Pages/Profile/ProfilePage'
import ChatPage from './Pages/Chat/ChatPage'
import AuthRoute from '@/PrivateRoutes/AuthRoute'
import PrivateRoute from '@/PrivateRoutes/PrivateRoute'
import { useEffect } from 'react'
import AuthStore from './store/AuthStore'

function App() {
 
  const {GetInfoRequest, UserInfo, setUserInfo,isLogin}=AuthStore()
  useEffect(()=>{
     (async()=>{
      if(UserInfo==null && isLogin()){
        const data= await GetInfoRequest();
        if(data?.data?._id){
          await setUserInfo(data.data)
        }
      }
     })()
  },[UserInfo])
  
  return (
    <>
    <BrowserRouter>
    <Routes>
      <Route path='/auth' element={<AuthRoute><AuthPage/></AuthRoute>} />      
      <Route path='/profile' element={<PrivateRoute><ProfilePage/></PrivateRoute>} />
      <Route path='/chat' element={<PrivateRoute><ChatPage/></PrivateRoute>} />
      <Route path='*' element={<Navigate to={'/auth'} />}></Route>
    </Routes>
    
    </BrowserRouter>
    <Toaster closeButton />
    </>
  )
}

export default App
