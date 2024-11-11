import { Button } from "@/components/ui/button";
import { LogOut, Plus } from "lucide-react";
import { useModal } from "./hooks/use-modal";
import Modal from "./components/modal";

export const Spaces = () => {
  const { onOpen } = useModal();

  return (
    <>
      <Modal />
      <div className="w-full pt-16 flex items-center justify-end">
        <div className="flex items-center justify-between gap-x-2">
          <Button
            variant="outline"
            className="text-blue-500 hover:bg-zinc-100 hover:text-blue-500"
            onClick={() => onOpen()}
          >
            <div className="flex items-center gap-x-1">
              <LogOut />
              <p>Enter with code</p>
            </div>
          </Button>
          <Button variant="blue">
            <div className="flex items-center gap-x-1">
              <Plus />
              <p>Create space</p>
            </div>
          </Button>
        </div>
      </div>
    </>
  );
};
