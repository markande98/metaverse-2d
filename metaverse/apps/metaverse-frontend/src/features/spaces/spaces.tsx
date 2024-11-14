import { Button } from "@/components/ui/button";
import { LogOut, Plus } from "lucide-react";
import Modal from "./components/modal";
import { SpaceJoinForm } from "./space-join-form";
import { useSpaceJoinModal } from "./hooks/use-space-join-modal";
import { useCreateSpaceModal } from "./hooks/use-create-space-modal";
import { CreateSpace } from "./create-space";
import { MySpace } from "./my-space";

export const Spaces = () => {
  const spaceJoinModal = useSpaceJoinModal();
  const createSpaceModal = useCreateSpaceModal();
  return (
    <div className="min-h-screen">
      <Modal
        isOpen={spaceJoinModal.isOpen}
        onOpen={spaceJoinModal.onOpen}
        onClose={spaceJoinModal.onClose}
      >
        <SpaceJoinForm />
      </Modal>
      <Modal
        isOpen={createSpaceModal.isOpen}
        onOpen={createSpaceModal.onOpen}
        onClose={createSpaceModal.onClose}
      >
        <CreateSpace />
      </Modal>
      <div className="w-full pt-16 flex items-center justify-between">
        <p className="text-xl font-semibold text-muted-foreground">My Spaces</p>
        <div className="flex items-center justify-between gap-x-2">
          <Button
            variant="outline"
            className="text-blue-500 hover:bg-zinc-100 hover:text-blue-500"
            onClick={() => spaceJoinModal.onOpen()}
          >
            <div className="flex items-center gap-x-1">
              <LogOut />
              <p>Enter with code</p>
            </div>
          </Button>
          <Button variant="blue" onClick={() => createSpaceModal.onOpen()}>
            <div className="flex items-center gap-x-1">
              <Plus />
              <p>Create space</p>
            </div>
          </Button>
        </div>
      </div>
      <MySpace />
    </div>
  );
};
