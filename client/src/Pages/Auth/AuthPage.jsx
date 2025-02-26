import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button"; 
import { useState } from "react";
import { IsEmail, IsEmpty, IsPasswordMatch } from "@/utility/ValidationHelper";
import AuthStore from "@/store/AuthStore";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

function AuthPage() {

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const {RegisterRequest, LoginRequest,setUserInfo , UserInfo}= AuthStore();
    const navigate= useNavigate();
    const handleLogin=async()=>{
      if(IsEmail(email) && !IsEmpty(password) )  {
        let response= await LoginRequest({email:email,password:password})
        if(response.status=='success'){
         toast.success(response.message);
         await setUserInfo(response.data)
         if(response.data.profileSetup) navigate('/chat')                  
         navigate('/profile')
        }
     }
    }

    const handleRegister=async()=>{
        if(IsEmail(email) && !IsEmpty(password) && IsPasswordMatch(password,confirmPassword))  {
           let response= await RegisterRequest({email:email,password:password})
           if(response.status=='success'){
            await setUserInfo(response.data)
            toast.success(response.message);
            navigate('/profile')

           }
        }
       
    }
    

  return (
    <>
      <div className="h-[100vh] w-[100vw] flex items-center justify-center">
        <div className="h-[80vh] my-auto bg-white border-2 border-white text-opacity-90 shadow-xl w-[80vw] md:w-[70vw] lg:w-[50vw] xl:w-[42vw] rounded-3xl ">
          <div className="flex h-[80vh] flex-col gap-5 items-center justify-center">
            <div className="flex flex-col  items-center justify-center gap-3 ">
              <h1 className="text-4xl font-bold md:text-5xl "> Welcome</h1>
              <p className="font-medium text-center text-slate-700">
                Fill in the details to get started with the best chat app!
              </p>
            </div>
            <div className="flex items-center justify-center w-full">
              <Tabs defaultValue="login" className="w-3/4">
                <TabsList className="bg-transparent rounded-none w-full">
                  <TabsTrigger value="login" className="data-[state=active]:bg-transparent text-black text-opacity-90 border-b-2 rounded-none w-full data-[state=active]:text-black data-[state=active]:font-semibold data-[state=active]:border-b-purple-500 p-3 transition-all duration-300">Login</TabsTrigger>
                  <TabsTrigger value="register" className="data-[state=active]:bg-transparent text-black text-opacity-90 border-b-2 rounded-none w-full data-[state=active]:text-black data-[state=active]:font-semibold data-[state=active]:border-b-purple-500 p-3 transition-all duration-300">Register</TabsTrigger>
                </TabsList>
                <TabsContent value="login" className='flex flex-col gap-4 mt-5'>
                  <Input placeholder='Email'
                  type='email'
                  className='rounded-full p-6 mt-2'
                  value={email}
                  onChange={(e)=>{setEmail(e.target.value)}}/>
                  <Input placeholder='Password'
                  type='password'
                  className='rounded-full p-6'
                  value={password}
                  onChange={(e)=>{setPassword(e.target.value)}}/>
                 <Button className='rounded-full p-6 ' onClick={handleLogin}> Login </Button>
                </TabsContent>
                <TabsContent value="register" className='flex flex-col gap-4 '>
                <Input placeholder='Email'
                  type='email'
                  className='rounded-full p-6'
                  value={email}
                  onChange={(e)=>{setEmail(e.target.value)}}/>
                  <Input placeholder='Password'
                  type='password'
                  className='rounded-full p-6'
                  value={password}
                  onChange={(e)=>{setPassword(e.target.value)}}/>
                  <Input placeholder='Confirm Password'
                  type='password'
                  className='rounded-full p-6'
                  value={confirmPassword}
                  onChange={(e)=>{setConfirmPassword(e.target.value)}}/>
                 <Button className='rounded-full p-6 ' onClick={handleRegister}> Register</Button>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default AuthPage;
