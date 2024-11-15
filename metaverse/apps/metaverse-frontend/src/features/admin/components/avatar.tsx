import Modal from "@/components/modal";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useCreateAvatarModal } from "../hooks/use-create-avatar";
import { CreateAvatarForm } from "../create-avatar-form";
import { AdminAvatars } from "../admin-avatars";

export const Avatar = () => {
  const { isOpen, onClose, onOpen } = useCreateAvatarModal();
  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose} onOpen={onOpen}>
        <CreateAvatarForm />
      </Modal>
      <div className="h-full">
        <div className="flex justify-end">
          <Button
            onClick={() => onOpen()}
            variant="blue"
            className="flex items-center"
          >
            <Plus />
            <span>Create Avatar</span>
          </Button>
        </div>
        <AdminAvatars />
      </div>
    </>
  );
};
