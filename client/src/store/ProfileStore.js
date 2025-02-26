import {create } from 'zustand';
import axios  from "axios";

const BaseURL=import.meta.env.VITE_SERVER_URL;
const ProfileStore=create((set)=>({

    
    UpdateProfileRequest:async(reqBody)=>{
        let res=await axios.post(`${BaseURL}/api/update-profile`,reqBody,{withCredentials:true});
        return res.data;
    },
    UpdateProfileImageRequest:async(reqBody)=>{
        let res=await axios.post(`${BaseURL}/api/update-profile-image`,reqBody,{withCredentials:true});
        return res.data;
    },
    DeleteProfileImageRequest:async()=>{
        let res=await axios.delete(`${BaseURL}/api/delete-profile-image`,{withCredentials:true});
        return res.data;
    },
    
}))

export default ProfileStore;