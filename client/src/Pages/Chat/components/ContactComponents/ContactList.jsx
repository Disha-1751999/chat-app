import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { getColor } from "@/lib/utils";
import ContactStore from "@/store/ContactStore";
import MessageStore from "@/store/MessageStore";
import React, { useEffect , useState} from "react";

const BaseURL = import.meta.env.VITE_SERVER_URL;

function ContactList({ contacts, isChannel = false }) {
  const {
    selectedChatType,
    selectedChatData,
    setSelectedChatType,
    setSelectedChatData,
    selectedChatMessages,
    setSelectedChatMessages,
    GetMessageRequest,
    allMessages
  } = ContactStore();
  const {GetLastMessageRequest}=MessageStore()

  useEffect(() => {
    (async() => {
      for (const [index, element] of contacts.entries()) {
       let res= await GetLastMessageRequest(element._id);
       contacts[index].lastMessage=res[0].content 
       await GetMessageRequest(element._id)        
      }
    })();
  }, []);


  const handleClick = (contact) => {
    if (isChannel) setSelectedChatType("Channel");
    else setSelectedChatType("contact");
    setSelectedChatData(contact);
    if (selectedChatData && selectedChatData._id !== contact._id) {
      setSelectedChatMessages([]);
    }
  };
  return (
    <div className="mt-5">
      {contacts.map((contact, index) => {
      
        return (
          <div
            key={index}
            className={`py-2 transition-all duration-300 cursor-pointer hover:bg-[#f1f1f111]`}
            onClick={() => {
              handleClick(contact);
            }}
          >
            <div className="flex gap-5 items-center justify-start text-neutral-300">
              {!isChannel && (
                <Avatar className="h-10 w-10 rounded-full overflow-hidden cursor-pointer">
                  {contact?.image ? (
                    <AvatarImage
                      src={`${BaseURL}/${contact.image}`}
                      alt="profile"
                      className="object-cover w-full bg-black"
                    />
                  ) : (
                    <div
                      className={`uppercase h-10 w-10 text-lg border-[1px] flex items-center justify-center rounded-full ${getColor(
                        contact?.color
                      )}`}
                    >
                      {contact?.firstName
                        ? contact?.firstName.charAt(0)
                        : contact?.email?.charAt(0)}
                    </div>
                  )}
                </Avatar>
              )}
              {
                isChannel && ( 
                    <div className="bg-[#ffffff22] h-10 w-10 flex items-center justify-center rounded-full">

                    </div>
                )
              }
              {
                isChannel? (<span>{contact.name}</span>): (
                <>
                  <span>{`${contact.firstName} ${contact.lastName}`}</span>
                  <span>{contact.lastMessage} </span>
                 </>
                )
              }
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default ContactList;
