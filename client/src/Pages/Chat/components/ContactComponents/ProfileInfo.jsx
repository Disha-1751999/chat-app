import { Avatar, AvatarImage } from "@/components/ui/avatar";
import AuthStore from "@/store/AuthStore";
import React from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { MdEdit } from "react-icons/md";
import { IoPowerSharp } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { getColor } from "@/lib/utils";
import ContactStore from "@/store/ContactStore";

const BaseURL = import.meta.env.VITE_SERVER_URL;

function ProfileInfo() {
  const { UserInfo, LogoutRequest, setUserInfo } = AuthStore();
  const {closeChat}=ContactStore()
  const navigate = useNavigate();

  const logout = async () => {
    let res = await LogoutRequest();
    if (res) {      
      toast.success("Logout Successful.");
      closeChat()
      navigate("/auth");
    }
  };

  
  if (!UserInfo) return null;

  return (
    <div className="absolute bottom-0 h-16 flex items-center justify-between px-5 w-full bg-[#2a2b33]">
      <div className="flex gap-3 items-center justify-center">
        <div className="w-10 h-10 relative">
          <Avatar className="h-10 w-10 rounded-full overflow-hidden cursor-pointer">
            {UserInfo?.image ? (
              <AvatarImage
                src={`${BaseURL}/${UserInfo.image}`}
                alt="profile"
                className="object-cover w-full bg-black"
              />
            ) : (
              <div
                className={`uppercase h-10 w-10 text-lg border-[1px] flex items-center justify-center rounded-full ${getColor(UserInfo?.color)}`}
              >
                {UserInfo?.firstName
                  ? UserInfo?.firstName.charAt(0)
                  : UserInfo?.email?.charAt(0)}
              </div>
            )}
          </Avatar>
        </div>
        <div>
          {UserInfo?.firstName && UserInfo?.lastName
            ? `${UserInfo.firstName} ${UserInfo.lastName}`
            : ""}
        </div>
      </div>
      <div className="flex gap-5">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              <MdEdit
                className="text-neutral-400 hover:text-neutral-200 text-xl font-medium"
                onClick={() => navigate("/profile")}
              />
            </TooltipTrigger>
            <TooltipContent className="text-white bg-[#1c1b1e] border-none">
              <p>Edit Profile</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              <IoPowerSharp
                className="text-neutral-400 hover:text-neutral-200 text-xl font-medium"
                onClick={logout}
              />
            </TooltipTrigger>
            <TooltipContent className="text-white bg-[#1c1b1e] border-none">
              <p>Logout</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
    </div>
  );
}

export default ProfileInfo;
