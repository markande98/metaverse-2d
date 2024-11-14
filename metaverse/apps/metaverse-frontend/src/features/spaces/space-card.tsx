import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { customAxios } from "@/lib/api";
import { useQueryClient } from "@tanstack/react-query";
import { Trash2 } from "lucide-react";
import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

interface SpaceCardProps {
  spaceId: string;
  name: string;
  thumbnail: string;
  dimensions: string;
}

export const SpaceCard = ({
  spaceId,
  name,
  thumbnail,
  dimensions,
}: SpaceCardProps) => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const onClick = () => {
    navigate(`/space/${spaceId}`);
  };

  const onDelete = useCallback(
    async (e) => {
      e.stopPropagation();
      try {
        await customAxios.delete(`/space/${spaceId}`);
        toast(`space ${name} deleted!`);
        await queryClient.refetchQueries({ queryKey: ["get-all-space"] });
      } catch (e) {
        console.log(e);
      }
    },
    [name, spaceId, queryClient]
  );
  return (
    <Card
      onClick={onClick}
      className="hover:shadow-lg transition-shadow duration-300 cursor-pointer"
    >
      <CardContent className="px-0">
        {thumbnail ? (
          <img src={thumbnail} alt="thumbnail" />
        ) : (
          <img
            src="/images/space.png"
            alt="thumbnail"
            className="object-cover rounded-md"
          />
        )}
      </CardContent>
      <CardFooter className="flex items-center justify-between p-2">
        <p className="font-sm text-muted-foreground text-sm">{name}</p>
        <Trash2 onClick={onDelete} size={20} />
      </CardFooter>
    </Card>
  );
};
