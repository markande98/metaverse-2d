import Modal from "@/components/modal";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useCreateMapModal } from "../hooks/use-create-map";
import { CreateMapForm } from "../create-map-form";

export const Map = () => {
  const { isOpen, onClose, onOpen } = useCreateMapModal();
  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose} onOpen={onOpen}>
        <CreateMapForm />
      </Modal>
      <div className="h-full">
        <div className="flex justify-end">
          <Button
            onClick={() => onOpen()}
            variant="blue"
            className="flex items-center"
          >
            <Plus />
            <span>Create Map</span>
          </Button>
        </div>
      </div>
    </>
  );
};
