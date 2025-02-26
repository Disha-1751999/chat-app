import {create } from 'zustand';
import axios  from "axios";
import ContactStore from "./ContactStore";

const BaseURL=import.meta.env.VITE_SERVER_URL;
const MessageStore=create((set)=>({
    
    
    
    UploadFileRequest:async(reqBody)=>{
        const { setFileUploadProgress } = ContactStore.getState();
        let res=await axios.post(`${BaseURL}/messages/upload-file`,reqBody,{withCredentials:true, onUploadProgress:(data)=>{setFileUploadProgress(Math.round((100*data.loaded)/ data.total))}} );
        return res.data;
    },
    GetLastMessageRequest:async(user)=>{
        let res=await axios.post(`${BaseURL}/messages/last-message`,{user:user},{withCredentials:true} );
        return res.data.lastMessage;
    },
 
    
}))

export default MessageStore;