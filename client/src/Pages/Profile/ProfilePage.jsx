import React, { useEffect, useState } from 'react'
import AuthStore from '@/store/AuthStore'
import { useNavigate } from 'react-router-dom'
import { IoArrowBack } from "react-icons/io5";
import { Avatar, AvatarImage } from '@/components/ui/avatar';
import { colors, getColor } from '@/lib/utils';
import { FaPlus, FaTrash } from "react-icons/fa";
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { IsEmpty } from '@/utility/ValidationHelper';
import { toast } from 'sonner';
import ProfileStore from '@/store/ProfileStore';
import { useRef } from 'react';

function ProfilePage() {
  const {UpdateProfileRequest, UpdateProfileImageRequest, DeleteProfileImageRequest}=ProfileStore()  
  const navigate=useNavigate()
  const {UserInfo,setUserInfo}=AuthStore();
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [image, setImage] = useState(null)
  const [hovered, setHovered] = useState(false)
  const [selectedColor, setSelectedColor] = useState(0)
  const fileInputRef=useRef(null) 
  useEffect(()=>{
    (async()=>{
        if(UserInfo.profileSetup) {
         setFirstName(UserInfo.firstName)
         setLastName(UserInfo.lastName)
         setSelectedColor(UserInfo.color)
         if(UserInfo.image){
          setImage(`${import.meta.env.VITE_SERVER_URL}/${UserInfo.image}`)
         }
        
        }
    })()
},[UserInfo])

  const saveChanges= async ()=>{
    if(IsEmpty(firstName) || IsEmpty(lastName)){
      toast.error("Provide all information to complete setup")
    }else{
     let data= await UpdateProfileRequest({firstName:firstName,lastName:lastName,color:selectedColor})
     
     await setUserInfo(data.data)     
     toast.success(data.message)
     navigate('/chat')
    }
  }
  
  const handleNavigate=async()=>{
    if(UserInfo.profileSetup){
      navigate('/chat')
    }
    else{
      toast.error('Please complete profile setup')
    }
  }
  
  const handleFileInputClick=()=>{
    fileInputRef.current.click();                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       
  }

  const handleImageChange=async(e)=>{
     const file =e.target.files[0]
     if(file){
      const formData= new FormData()
      formData.append("profile-image", file)
      const res= await UpdateProfileImageRequest(formData)
      if(res.status=="success"){       
        setImage(`${import.meta.env.VITE_SERVER_URL}/${res.data}`)
      }


     }
  }

  const handleDeleteImage=async(e)=>{
    try {
      const res = await DeleteProfileImageRequest(); 
      if (res.status === "success") {
        setImage(null); 
        await setUserInfo({ image: null }); 
      } else {
        toast.error("Something went wrong");
      }
    } catch (error) {
      toast.error("An error occurred while deleting the profile image");
    }
    
  }


  if (!UserInfo) {
    navigate('/auth')
    return
  };

  return (
    <div className='bg-[#1b1c24] h-[100vh] flex items-center justify-center flex-col gap-10'>
      <div className='flex flex-col gap-10 w-[80vw] md:w-max'>
         <div onClick={handleNavigate}>
          <IoArrowBack className='text-4xl lg:text-6xl text-white/90 cursor-pointer' />
         </div > 
         <div className='grid grid-cols-2'>
              <div className='h-full w-32 md:w-48 md:h-48 relative flex items-center justify-center'
              onMouseEnter={()=>{setHovered(true)}}
              onMouseLeave={()=>{setHovered(false)}}> 
              <Avatar className='h-32 w-32 md:w-48 md:h-48 rounded-full overflow-hidden cursor-pointer'>
                {image?(<AvatarImage
                src={image}
                alt='profile'
                className='object-cover w-full- bg-black'/>):
                (<div className={`uppercase h-32 w-32 md:w-48 md:h-48 text-5xl border-[1px] flex items-center justify-center rounded-full ${getColor(selectedColor)}`}>
                  {
                    firstName? firstName.split("").shift():UserInfo.email.split("").shift()
                  }
                </div>)}
              </Avatar>
              {
                hovered && (<div className='absolute inset-0 flex items-center justify-center bg-black/50 ring-fuchsia-50 rounded-full'
                onClick={image? handleDeleteImage: handleFileInputClick}>
                  {
                     image? (<FaTrash className='text-white text-3xl cursor-pointer' />):(<FaPlus  className='text-white text-3xl cursor-pointer'  />)
                  }
                </div>)
              }
             <input type="file" name='profile-image' ref={fileInputRef}  className='hidden' onChange={handleImageChange} accept='.jpg, .png , .jpeg, .svg, .webp'/>
              </div>
              <div className='flex min-w-32 md:min-w-64 flex-col gap-5 text-white items-center justify-center '>
                <div className='w-full'>
              <Input
              placeholder='Email'
              type='email'
              disabled
              value={UserInfo.email}
              className='rounded-lg p-6 bg-[#2c2e3b] border-none'
              />

                </div>

                <div className='w-full'>
              <Input
              placeholder='First Name'
              type='text'
              onChange={(e)=>{setFirstName(e.target.value)}}
              value={firstName}
              className='rounded-lg p-6 bg-[#2c2e3b] border-none'
              required
              />

                </div>

                <div className='w-full'>
              <Input
              placeholder='Last Name'
              type='text'
              onChange={(e)=>{setLastName(e.target.value)}}
              value={lastName}
              className='rounded-lg p-6 bg-[#2c2e3b] border-none'
              required
              />

                </div>
                <div className='w-full flex gap-5 '>
               
                  {
                    colors.map((color,index)=>{
                     return (<div 
                      className={`${color} h-8 w-8 rounded-full cursor-pointer transition-all duration-300 ${selectedColor===index? 'outline outline-white/50 outline-1': ''}`} key={index}
                      onClick={()=>{setSelectedColor(index)}}>
                       
                      </div>)
                    })
                  }
                </div>
              </div>

         </div>
         <div className='w-full'>
          <Button className='h-10 float-right  bg-purple-700 hover:bg-purple-900 transition-all duration-300'
          onClick={saveChanges}> Save Changes</Button>
         </div>
      </div>
    </div>
  )
}

export default ProfilePage