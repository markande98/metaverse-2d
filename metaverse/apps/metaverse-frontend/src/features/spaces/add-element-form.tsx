import { Button } from "@/components/ui/button";
import { customAxios } from "@/lib/api";
import { cn } from "@/lib/utils";
import { useQueryClient } from "@tanstack/react-query";
import { CheckCircle } from "lucide-react";
import { useCallback, useState } from "react";
import { toast } from "sonner";
import { useAddElementModal } from "./hooks/use-add-element-modal";
import { useGetElements } from "./hooks/use-get-elements";

interface AddElementFormProps {
  spaceId: string;
  handleUpdateElementMessage: (x?: number, y?: number, isAdd?: boolean) => void;
}

export const AddElementForm = ({
  spaceId,
  handleUpdateElementMessage,
}: AddElementFormProps) => {
  const [activeElement, setActiveElement] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const elements = useGetElements();
  const { data, onClose } = useAddElementModal();
  const queryClient = useQueryClient();

  const handleAddElement = useCallback(async () => {
    try {
      setIsLoading(true);
      await customAxios.post("/space/element", {
        elementId: activeElement,
        spaceId,
        x: data?.x,
        y: data?.y,
      });
      toast("element added!");
      onClose();
      await queryClient.refetchQueries({ queryKey: ["get-space"] });
      handleUpdateElementMessage(data?.x, data?.y, true);
    } catch (e) {
      console.log(e);
    } finally {
      setIsLoading(false);
    }
  }, [
    onClose,
    activeElement,
    data?.x,
    data?.y,
    spaceId,
    queryClient,
    handleUpdateElementMessage,
  ]);

  return (
    <div className="space-y-4">
      <h2 className="font-bold">Add Element</h2>
      <div className="flex items-center w-full flex-wrap gap-4">
        {elements.map((element) => (
          <div
            onClick={() => setActiveElement(element.id)}
            className={cn(
              "flex items-center justify-center cursor-pointer relative",
              activeElement === element.id && "border-4 border-zinc-500",
            )}
          >
            <img className="h-20 w-20" src={element.imageUrl} alt="element" />
            {activeElement === element.id && (
              <div className="bg-yellow-200 absolute -top-2 -right-2 rounded-full">
                <CheckCircle color="red" />
              </div>
            )}
          </div>
        ))}
      </div>
      <Button
        onClick={handleAddElement}
        className="w-full"
        variant="blue"
        disabled={!activeElement || isLoading}
      >
        Add
      </Button>
    </div>
  );
};
