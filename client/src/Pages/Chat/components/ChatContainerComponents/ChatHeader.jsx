import { Avatar, AvatarImage } from '@/components/ui/avatar'
import { getColor } from '@/lib/utils'
import ContactStore from '@/store/ContactStore'
import React from 'react'
import {RiCloseFill} from 'react-icons/ri'

const BaseURL = import.meta.env.VITE_SERVER_URL;

function ChatHeader() {
  const {closeChat,selectedChatData,selectedChatType}=ContactStore()
  return (
    <div className='h-[10vh] border-b-2 border-[#2f303b] flex items-center justify-between px-20'>
        <div className='flex gap-5 items-center w-full  justify-between'>
            <div className='flex gap-3 items-center justify-center'>
              <div className="w-10 h-10 relative">
                                    <Avatar className="h-10 w-10 rounded-full overflow-hidden cursor-pointer">
                                      {selectedChatData?.image ? (
                                        <AvatarImage
                                          src={`${BaseURL}/${selectedChatData.image}`}
                                          alt="profile"
                                          className="object-cover w-full bg-black"
                                        />
                                      ) : (
                                        <div
                                          className={`uppercase h-10 w-10 text-lg border-[1px] flex items-center justify-center rounded-full ${getColor(
                                            selectedChatData?.color
                                          )}`}
                                        >
                                          {selectedChatData?.firstName
                                            ? selectedChatData?.firstName.charAt(0)
                                            : selectedChatData?.email?.charAt(0)}
                                        </div>
                                      )}
                                    </Avatar>
                                  </div>
                                  <div>
                                    {selectedChatType==="contact" && `${selectedChatData?.firstName} ${selectedChatData?.lastName}`}
                                  </div>
            </div>
            <div className='flex items-center justify-center gap-5'>
                <button 
                onClick={closeChat}
                className='text-neutral-500 focus:border-none focus:outline-none focus:text-white duration-300 transition-all'>
                    <RiCloseFill className='text-2xl'/>
                </button>
            </div>
        </div>
    </div>
  )
}

export default ChatHeader