import AuthStore from '@/store/AuthStore';
import ContactStore from '@/store/ContactStore';
import moment from 'moment';
import React, { useEffect, useRef, useState } from 'react'
import { MdFolderZip } from 'react-icons/md';
import {IoMdArrowRoundDown} from 'react-icons/io';
import axios from 'axios';
import { IoCloseSharp } from 'react-icons/io5';
function MessageContainer() {
  const scrollRef=useRef();
  const {selectedChatType,selectedChatData, selectedChatMessages,setSelectedChatMessages,GetMessageRequest,setIsDownloading, setFileDownloadProgress}=ContactStore()
  const {UserInfo}=AuthStore()
  const [showImage, setShowImage]=useState(false)
  const [imageURL, setImageURL]=useState(null)

 
  const BaseURL = import.meta.env.VITE_SERVER_URL;



  useEffect(()=>{
    
   const getMessages=async()=>{
    try{
      const res= await GetMessageRequest(selectedChatData._id)
      if(res.status=="success"){
        setSelectedChatMessages(res.messages)
      }
    }catch(e){
       console.log(e)
    }
   }
   if(selectedChatData._id){
    if(selectedChatType === "contact") getMessages()
   }
  },[ selectedChatType, selectedChatData])

  useEffect(()=>{
    if(scrollRef.current){
      scrollRef.current.scrollIntoView({behavior:"smooth"})
    }
  },[selectedChatMessages])

  const checkIfImage=(filePath)=>{
    const imageRegex = /\.(jpg|jpeg|png|gif|bmp|tiff|tif|webp|svg|ico|heic|heif)$/i;
    return imageRegex.test(filePath)
  }

  const downloadFile=async(url)=>{
    setIsDownloading(true)
    setFileDownloadProgress(0)
    const res= await axios.get(`${BaseURL}/${url}`,{responseType: "blob",
      onDownloadProgress: (progressEvent)=>{
        const {loaded, total}=progressEvent;
        const percentCompleted=Math.round((loaded*100)/total);
        setFileDownloadProgress(percentCompleted)
      }
    })
   const urlBlob= window.URL.createObjectURL(new Blob([res.data]));
   const link= document.createElement("a")
   link.href=urlBlob;
   link.setAttribute("download", url.split("/").pop());
   document.body.appendChild(link)
   link.click()
   link.remove()
   window.URL.revokeObjectURL(urlBlob)
   setIsDownloading(false)
   setFileDownloadProgress(0)
  }

  const renderMessage=()=>{

    let lastDate=null;
    return selectedChatMessages.map((message,index)=>{
      const messageDate=moment(message.timestamp).format("YYYY-MM-DD");
      const  showDate= messageDate!=lastDate
      lastDate=messageDate
      return(
        <div key={index}>
          {
            showDate && (
            <div className='text-center text-gray-500 my-2'>
               {moment(message.timestamp).format("LL")}
            </div>
            )
          }
           {selectedChatType==="contact" && renderDMMessages(message)}
        </div>
      )
    })
  }


  const renderDMMessages=(message)=>{
    return(

      <div className={`${message.sender === selectedChatData._id ? "text-left" : "text-right"}`}>
      {message.messageType === "text" && (
        <div className={`${message.sender !== selectedChatData._id ? "bg-[#8417ff]/5 text-[#8417ff]/90 border-[#8417ff]/50" : "bg-[#2a2b33]/5 text-white/80 border-[#ffffff]/20"} border inline-block px-4 py-2 rounded my-1 max-[50%]  break-words`}>
        {message.content}
      </div>
      )}
      {message.messageType === "file" && (
        <div className={`${message.sender !== selectedChatData._id ? "bg-[#8417ff]/5 text-[#8417ff]/90 border-[#8417ff]/50" : "bg-[#2a2b33]/5 text-white/80 border-[#ffffff]/20"} border inline-block px-4 py-2 rounded my-1 max-[50%]  break-words`}>
        {checkIfImage(message.fileUrl)? (
          <div className='cursor-pointer' 
          onClick={()=>{
            setShowImage(true)
            setImageURL(message.fileUrl)
          }}>
               <img src={`${BaseURL}/${message.fileUrl}`}
               width={300}
               height={300}
               alt=''
               />
          </div>
          ) :(
          <div className='flex items-center justify-center gap-4'>
          <span className='text-white/80 text-3xl  bg-black/20 rounded-full p-3'>
          <MdFolderZip/>
          </span>
          <span>
            {message.fileUrl.split("/").pop()}
          </span>
          <span className='bg-black/20 p-3 text-2xl rounded-full hover:bg-black/50 cursor-pointer transition-all duration-300'
          onClick={()=>{downloadFile(message.fileUrl)}}> 
            <IoMdArrowRoundDown />
            </span>
          </div>
        )}
      </div>
      )}
      <div className='text-xs text-gray-600 '>
               {moment(message.timestamp).format("LT")}
            </div>
     </div>
    )
  
   
  }


  return (
    <div className='flex-1 overflow-auto scrollbar-hidden p-4 px-8 md:w-[65vw] lg:w-[70vw] xl:w-[80] w-full'>
      {renderMessage()}
      <div ref={scrollRef}/>
      {
        showImage && (
          <div className='fixed z-[1000] top-0 left-0 h-[100vh] w-[100vw] flex items-center justify-center backdrop-blur-lg flex-col'>
              <div>
                <img 
                alt=''
                src={`${BaseURL}/${imageURL}`}
                className='h-[80vh] w-[80vw] bg-cover'/>

              </div>
              <div className='flex gap-5 fixed top-0 mt-5'>
                <buton className='bg-black/20 p-3 text-2xl rounded-full hover:bg-black/50 cursor-pointer transition-all duration-300'
                onClick={()=>{downloadFile(imageURL)}}> 
                  <IoMdArrowRoundDown/>
                </buton>
                <buton className='bg-black/20 p-3 text-2xl rounded-full hover:bg-black/50 cursor-pointer transition-all duration-300'
                onClick={()=>{
                  setShowImage(false)
                  setImageURL(null)
                }}> 
                  <IoCloseSharp/>
                </buton>

              </div>
          </div>
        )
      }
    </div>
  )
}

export default MessageContainer