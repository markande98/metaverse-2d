import Modal from "@/components/modal";
import { ElementCard } from "./element-card";
import { useGetAdminElements } from "./hooks/use-get-admin-elements";
import { useUpdateElementModal } from "./hooks/use-update-element";
import { UpdateElementForm } from "./update-element-form";

export const AdminElements = () => {
  const { isOpen, onClose } = useUpdateElementModal();
  const elements = useGetAdminElements();

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <UpdateElementForm />
      </Modal>
      <div className="pt-20 flex items-center flex-wrap justify-between">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {elements?.map((element) => (
            <ElementCard
              key={element.id}
              id={element.id}
              width={element.width}
              height={element.height}
              isStatic={element.static}
              imageUrl={element.imageUrl}
            />
          ))}
        </div>
      </div>
    </>
  );
};
