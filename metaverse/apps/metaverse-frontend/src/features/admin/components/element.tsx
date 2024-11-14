import Modal from "@/components/modal";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useCreateElementModal } from "../hooks/use-create-element";
import { CreateSpaceForm } from "../create-element-form";
import { AdminElements } from "../admin-elements";

export const Element = () => {
  const { isOpen, onClose, onOpen } = useCreateElementModal();
  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose} onOpen={onOpen}>
        <CreateSpaceForm />
      </Modal>
      <div className="h-full">
        <div className="flex justify-end">
          <Button
            onClick={() => onOpen()}
            variant="blue"
            className="flex items-center"
          >
            <Plus />
            <span>Create Element</span>
          </Button>
        </div>
        <AdminElements />
      </div>
    </>
  );
};
