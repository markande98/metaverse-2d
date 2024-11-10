import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Button } from "@/components/ui/button";
import { useCurrentUser } from "./hooks/use-current-user";
import { ChevronDown, ChevronUp, LogOut } from "lucide-react";
import { useState } from "react";
import { useAuth } from "./auth-provider";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

export const UserProfile = () => {
  const [open, setOpen] = useState(false);
  const data = useCurrentUser();
  const { handleLogout } = useAuth();
  const navigate = useNavigate();

  const firstLetter = data?.username.toUpperCase()[0];

  const handleOpenChange = () => {
    setOpen((open) => !open);
  };

  const onSignOut = async () => {
    try {
      const res = await handleLogout();
      console.log(res.data);
      navigate("/auth");
      toast("Signed out!");
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <DropdownMenu onOpenChange={handleOpenChange}>
      <DropdownMenuTrigger>
        <Button
          size="sm"
          className="flex border-none justify-between shadow-none"
          variant="outline"
        >
          <div className="bg-blue-300 rounded-full h-8 w-8 flex justify-center items-center">
            {firstLetter}
          </div>
          <span>{open ? <ChevronDown /> : <ChevronUp />}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>{data?.username}</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>{data?.role}</DropdownMenuItem>
        <DropdownMenuItem>spaces</DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onClick={onSignOut}
          className="flex items-center gap-x-2"
        >
          <LogOut />
          <p className="font-bold text-red-400">Sign out</p>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
