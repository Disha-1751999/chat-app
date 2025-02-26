import {create } from 'zustand';
import axios  from "axios";

const BaseURL=import.meta.env.VITE_SERVER_URL;
const ContactStore=create((set,get)=>({
    
    SearchContactRequest:async(keyword)=>{
        let res=await axios.get(`${BaseURL}/contacts/search/${keyword}`,{withCredentials:true});
        return res.data;
    },
    selectedChatType:undefined,
    selectedChatData: undefined,
    selectedChatMessages:[],
    directMessageContacts:[],
    isUploading:false,
    isDownloading:false,
    fileUploadProgress:0,
    fileDownloadProgress:0,
    allMessages:[],
    setAllMessages:(allMessages)=>set({allMessages}),
    setIsUploading:(isUploading)=>set({isUploading}),
    setIsDownloading:(isDownloading)=>set({isDownloading}),
    setFileUploadProgress:(fileUploadProgress)=>set({fileUploadProgress}),
    setFileDownloadProgress:(fileDownloadProgress)=>set({fileDownloadProgress}),
    setDirectMessageContacts:(directMessageContacts)=>{set({directMessageContacts})},
    setSelectedChatType:(selectedChatType)=>{set({selectedChatType})},
    setSelectedChatData:(selectedChatData)=>{set({selectedChatData})},
    setSelectedChatMessages:(selectedChatMessages)=>{set({selectedChatMessages})},
    closeChat:()=>set({
        selectedChatData:undefined,
        selectedChatType:undefined,
        selectedChatMessages: []
    }),
    addMessage:(message)=>{
        const selectedChatMessages=get().selectedChatMessages;
        const selectedChatType=get().selectedChatType;

        set({

            selectedChatMessages:[
                ...selectedChatMessages,
                {

                    ...message,
                    recipient: selectedChatType==="channel"? message.recipient:message.recipient._id,
                    sender:selectedChatType==="channel"? message.sender:message.sender._id,
                }
            ]
        })
    },
    GetMessageRequest:async(receiver)=>{
        let res=await axios.post(`${BaseURL}/messages/get-messages`,{id:receiver},{withCredentials:true});
        get().setAllMessages(res.data.messages);
        return res.data;
    },
    GetContactsForDMListRequest:async()=>{
        let res=await axios.get(`${BaseURL}/contacts/get-contacts-for-dm`,{withCredentials:true});
        return res.data;
    },
    GetAllContactsRequest:async()=>{
        let res=await axios.get(`${BaseURL}/contacts/get-all-contacts`,{withCredentials:true});
        return res.data;
    },
}))

export default ContactStore;