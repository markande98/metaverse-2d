import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { LogOut, Shield, User } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { useAuth } from "../auth-provider";
import { useAvatarModal } from "../hooks/use-avatar-update";
import { useCurrentUser } from "../hooks/use-current-user";

export const UserProfile = () => {
  const data = useCurrentUser();
  const { handleLogout } = useAuth();
  const navigate = useNavigate();
  const { onOpen } = useAvatarModal();

  const firstLetter = data?.username.toUpperCase()[0];

  const onSignOut = async () => {
    try {
      await handleLogout();
      navigate("/auth");
      toast("Signed out!");
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <div className="h-11 w-11 flex items-center justify-center rounded-full bg-white">
          <Avatar className="h-9 w-9 cursor-pointer hover:opacity-80 transition-opacity">
            <AvatarImage src={data?.avatar.imageUrl ?? ""} />
            <AvatarFallback>{firstLetter}</AvatarFallback>
          </Avatar>
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-fit" align="center">
        <DropdownMenuLabel>{data?.username}</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <Shield className="mr-2 h-4 w-4" />
          <span>{data?.role}</span>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => onOpen()}>
          <User className="mr-2 h-4 w-4" />
          <span>Avatar</span>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={onSignOut} className="text-destructive">
          <LogOut className="mr-2 h-4 w-4" />
          <span>Log out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
