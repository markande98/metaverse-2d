import { X } from "lucide-react";

interface ModalProps {
  isOpen?: boolean;
  onOpen: () => void;
  onClose: () => void;
  children: React.ReactNode;
}

const Modal = ({ isOpen, onClose, children }: ModalProps) => {
  if (!isOpen) return null;

  return (
    <div>
      <div className="fixed inset-0 z-50 flex items-center justify-center">
        {/* Backdrop */}
        <div className="fixed inset-0 bg-black/50" onClick={onClose} />

        {/* Modal */}
        <div className="relative bg-white rounded-lg shadow-lg w-full max-w-md m-4 p-6">
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
          >
            <X size={20} />
          </button>

          {/* Modal content */}
          {/* <div className="space-y-4">
            <h2 className="text-xl font-semibold">Enter with code</h2>
            <SpaceJoinForm />
          </div> */}
          {children}
        </div>
      </div>
    </div>
  );
};

export default Modal;
