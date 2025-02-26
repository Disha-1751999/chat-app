import {create } from 'zustand';
import axios  from "axios";
import Cookies from "js-cookie";

const BaseURL=import.meta.env.VITE_SERVER_URL;
const AuthStore=create((set)=>({

    isLogin:()=>{
        return !!Cookies.get('token');
    },

    RegisterRequest:async(reqBody)=>{
        let res=await axios.post(`${BaseURL}/api/register`,reqBody,{withCredentials:true});
        return res.data;
    },
    LoginRequest:async(reqBody)=>{
        let res=await axios.post(`${BaseURL}/api/login`,reqBody,{withCredentials:true});
        return res.data;
    },

    UserInfo:null,

    setUserInfo:(data)=>{
        set((state)=>({
            UserInfo:{
                ...(state.UserInfo || {}),
               ...data
            }
        }))
    },
    GetInfoRequest:async()=>{
        let res=await axios.get(`${BaseURL}/api/user-info`,{withCredentials:true});
        return res.data;
    },
    LogoutRequest:async()=>{
        let res=await axios.get(`${BaseURL}/api/logout`,{withCredentials:true});
        Cookies.remove('token');
        set((state)=>({
            UserInfo:null
        }))
        return res.data;
    },
    
}))

export default AuthStore;