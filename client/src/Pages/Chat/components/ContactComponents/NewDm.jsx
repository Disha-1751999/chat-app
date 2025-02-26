import React, { useState } from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { FiPlus } from "react-icons/fi";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import Lottie from "react-lottie";
import { animationDefaultOptions2, getColor } from "@/lib/utils.js";
import { toast } from "sonner";
import ContactStore from "@/store/ContactStore";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarImage } from "@/components/ui/avatar";

const BaseURL = import.meta.env.VITE_SERVER_URL;

function NewDm() {
  const [openNewContactModal, setOpenNewContactModal] = useState(false);
  const { SearchContactRequest, setSelectedChatType, setSelectedChatData  } = ContactStore();
  const [searchedContacts, setSearchedContacts] = useState([]);

  const searchContacts = async (keyword) => {
    if (keyword) {
      let res = await SearchContactRequest(keyword);
      if (res.contacts.length > 0) {
        setSearchedContacts(res.contacts);
      }
    } else {
      setSearchedContacts([]);
    }
  };

  const selectNewContact=async(data)=>{
    setOpenNewContactModal(false);
    setSelectedChatType("contact")
    setSelectedChatData(data)
    setSearchedContacts([]);
  }

  return (
    <>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger>
            <FiPlus
              onClick={() => {
                setOpenNewContactModal(true);
                setSearchedContacts([]);
              }}
              className="text-neutral-400 font-light text-opacity-90  hover:text-neutral-100 text-lg cursor-pointer transition-all duration-300 "
            />
          </TooltipTrigger>
          <TooltipContent className="text-white bg-[#1c1b1e] border-none">
            <p>Select New Contact</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
      <Dialog open={openNewContactModal} onOpenChange={setOpenNewContactModal}>
        <DialogContent className="bg-[#181920] border-none text-white w-[400px] h-[400px] flex flex-col">
          <DialogHeader>
            <DialogTitle>Please Select a Contact</DialogTitle>
            <DialogDescription></DialogDescription>
          </DialogHeader>
          <div>
            <Input
              placeholder="Search Contacts"
              className="rounded-lg p-6  bg-[#2c2e3b] border-none"
              onChange={(e) => {
                searchContacts(e.target.value);
              }}
            />
          </div>
          {searchedContacts.length < 1 && (
            <div className="flex flex-col justify-center items-center  duration-1000 transition-all">
              <Lottie
                isClickToPauseDisabled={true}
                width={100}
                height={100}
                options={animationDefaultOptions2}
              />
              <div className="text-opacity-80 text-white  text-lg transition-all duration-300 text-center">
                <h4 className="poppins-medium">Search New Contact</h4>
              </div>
            </div>
          )}
          <ScrollArea className="h-[250px] ">
            <div className="flex flex-col gap-5">
              {searchedContacts.length > 0 &&
                searchedContacts.map((item, index) => {
                 return(<>
                 <div
                    key={index}
                    className="flex gap-3 items-center cursor-pointer"
                    onClick={()=>{selectNewContact(item)}}
                  >
                    <div className="w-10 h-10 relative">
                      <Avatar className="h-10 w-10 rounded-full overflow-hidden cursor-pointer">
                        {item?.image ? (
                          <AvatarImage
                            src={`${BaseURL}/${item.image}`}
                            alt="profile"
                            className="object-cover w-full bg-black rounded-full"
                          />
                        ) : (
                          <div
                            className={`uppercase h-10 w-10 text-lg border-[1px] flex items-center justify-center rounded-full ${getColor(
                              item?.color
                            )}`}
                          >
                            {item?.firstName
                              ? item?.firstName.charAt(0)
                              : item?.email?.charAt(0)}
                          </div>
                        )}
                      </Avatar>
                    </div>
                    <div className="flex flex-col">
                      <span> {item?.firstName && item?.lastName
                        ? `${item.firstName} ${item?.lastName}`
                        : `${item.email}`}
                        </span>
                        <span className="text-xs">
                        {item.email}
                        </span>
                    </div>                    
                  </div>
                  
                  </>) ;
                })}
            </div>
          </ScrollArea>

        
        </DialogContent>
      </Dialog>
    </>
  );
}

export default NewDm;
