import { Spaces } from "@/features/spaces/spaces";
import { CardWrapper } from "./card-wrapper";
import { Header } from "./header";
import Modal from "./modal";
import { useAvatarModal } from "@/features/auth/hooks/use-avatar-update";
import { AvatarUpdateForm } from "@/features/auth/components/avatar-update-form";
import { Footer } from "./footer";

export const Dashboard = () => {
  const { isOpen, onClose } = useAvatarModal();
  return (
    <div className="bg-gradient-to-br ">
      <Modal isOpen={isOpen} onClose={onClose}>
        <AvatarUpdateForm />
      </Modal>
      <CardWrapper>
        <Header />
        <Spaces />
      </CardWrapper>
      <Footer />
    </div>
  );
};
