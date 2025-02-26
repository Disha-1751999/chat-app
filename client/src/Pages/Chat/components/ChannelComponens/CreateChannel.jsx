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

function CreateChannel() {
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
        </DialogContent>
      </Dialog>
    </>
  );
}

export default CreateChannel;
