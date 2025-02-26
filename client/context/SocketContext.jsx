import AuthStore from '@/store/AuthStore';
import ContactStore from '@/store/ContactStore';
import {createContext, useContext,useEffect, useRef,useState} from 'react';
import { io } from 'socket.io-client';

const SocketContext =createContext(null)

const BaseURL=import.meta.env.VITE_SERVER_URL;

export const useSocket=()=>{
    return useContext(SocketContext)
};

export const SocketProvider=({children})=>{
//   const socket= useRef();
const [socket, setSocket] = useState(null); 
  const {UserInfo}=AuthStore();

  useEffect(()=>{
    if(UserInfo){
        const newSocket=io( BaseURL,{
            withCredentials:true,
            query:{userId:UserInfo._id}
        });
        newSocket.on("connect",()=>{
        console.log('Connected to socket server')
        });


        const handleRecieveMessage=(message)=>{
            const {selectedChatData,selectedChatType,addMessage}=ContactStore.getState()
            if(selectedChatType!==undefined && (selectedChatData._id===message.sender._id || selectedChatData._id=== message.recipient._id)){
                
                console.log(message)
                addMessage(message)
            }
        } 

        newSocket.on("recieveMessage",handleRecieveMessage);
        setSocket(newSocket);
        return ()=>{
            newSocket.disconnect();
        }
        
    }
  },[UserInfo]);


  return (
    <SocketContext.Provider value={socket}>
        {children}
    </SocketContext.Provider>
)
} 


