/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { customAxios } from "@/lib/api";
import { useQueryClient } from "@tanstack/react-query";
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
      className="hover:shadow-lg text-white transition-shadow cursor-pointer bg-gradient-to-r from-slate-700 via-slate-600 to-slate-700 relative"
    >
      <div className="absolute top-4 right-4 overflow-hidden rounded-md">
        <img src={thumbnail} className="h-14 w-14" />
      </div>
      <CardHeader>
        <CardTitle>{name.toUpperCase()}</CardTitle>
        <CardDescription className="text-white">
          Real-time user engagement metrics
        </CardDescription>
      </CardHeader>
      <CardContent className="hover:shadow-lg transition-shadow flex items-center justify-between">
        <p className="text-sm mt-1">Dimensions : {dimensions}</p>
        <svg
          onClick={onDelete}
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="icon icon-tabler icons-tabler-filled icon-tabler-trash text-destructive hover:scale-110 transition duration-150"
        >
          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
          <path d="M20 6a1 1 0 0 1 .117 1.993l-.117 .007h-.081l-.919 11a3 3 0 0 1 -2.824 2.995l-.176 .005h-8c-1.598 0 -2.904 -1.249 -2.992 -2.75l-.005 -.167l-.923 -11.083h-.08a1 1 0 0 1 -.117 -1.993l.117 -.007h16z" />
          <path d="M14 2a2 2 0 0 1 2 2a1 1 0 0 1 -1.993 .117l-.007 -.117h-4l-.007 .117a1 1 0 0 1 -1.993 -.117a2 2 0 0 1 1.85 -1.995l.15 -.005h4z" />
        </svg>
      </CardContent>
    </Card>
  );
};
