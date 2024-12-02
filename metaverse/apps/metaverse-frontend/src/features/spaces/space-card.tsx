/* eslint-disable @typescript-eslint/no-explicit-any */
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
    async (e: any) => {
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
      className="hover:shadow-lg transition-shadow duration-300 cursor-pointer hover:border-4 hover:border-gray-400"
    >
      <CardContent className="px-0">
        {thumbnail ? (
          <img
            src={thumbnail}
            alt="thumbnail"
            className="object-cover rounded-t-xl"
          />
        ) : (
          <img
            src="/images/space.png"
            alt="thumbnail"
            className="object-cover rounded-md"
          />
        )}
      </CardContent>
      <CardFooter className="flex items-center justify-between p-4">
        <div className="flex-col items-center justify-center space-y-4">
          <p className="font-sm text-muted-foreground text-sm">{name}</p>
          <p className="font-sm text-muted-foreground text-sm">
            Dimensions: {`${dimensions}`}
          </p>
        </div>
        <Trash2 onClick={onDelete} size={20} />
      </CardFooter>
    </Card>
  );
};
