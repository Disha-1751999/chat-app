import AuthStore from '@/store/AuthStore'
import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'sonner';
import ContactContainer from './components/ContactComponents/ContactContainer';
import EmptyContainer from './components/EmptyContainer';
import ChatContainer from './components/ChatContainerComponents/ChatContainer';
import ContactStore from '@/store/ContactStore';

function ChatPage() {
  
  const navigate=useNavigate()
  const {UserInfo}=AuthStore();
  const {selectedChatType,isUploading,isDownloading, fileUploadProgress, fileDownloadProgress, }=ContactStore()

  useEffect(()=>{
     if(!UserInfo.profileSetup){
      toast.error('Please setup your profile to continue')
      navigate('/profile')
     }
  },[UserInfo,navigate])
  

  return (
    <div className='flex h-[100vh] overflow-hidden text-white'>
     {
     isUploading && <div className='h-[100vh] w-[100vw] fixed top-0 z-10 left-0 bg-black/80 flex items-center justify-center flex-col gap-5 backdrop-blur-lg'>
      <h5 className='text-5xl animate-pulse'>
       Uploading File
      </h5>
      {fileUploadProgress}% 
     </div>

     } 
      {
     isDownloading && <div className='h-[100vh] w-[100vw] fixed top-0 z-10 left-0 bg-black/80 flex items-center justify-center flex-col gap-5 backdrop-blur-lg'>
      <h5 className='text-5xl animate-pulse'>
      Downloading File
      </h5>
      {fileDownloadProgress}% 
     </div>

     } 
     <ContactContainer/>
      {
        selectedChatType===undefined? <EmptyContainer/> :  <ChatContainer/>
      }
     
    </div>
  )
}

export default ChatPage