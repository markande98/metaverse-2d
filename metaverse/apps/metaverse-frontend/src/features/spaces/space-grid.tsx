import { customAxios } from "@/lib/api";
import { useQueryClient } from "@tanstack/react-query";
import { Plus, Trash2 } from "lucide-react";
import { useCallback } from "react";
import { spaceElementsInfo } from "../types";
import { useAddElementModal } from "./hooks/use-add-element-modal";

interface SpaceGridProps {
  width: number;
  height: number;
  currentUserX: number;
  currentUserY: number;
  currentUserName?: string;
  users: Map<string, any>;
  spaceElements: spaceElementsInfo[];
  currentUserAvatar?: string | null;
  isSpaceOwner: boolean;
}

export const SpaceGrid = ({
  width,
  height,
  currentUserX,
  currentUserY,
  currentUserName,
  users,
  spaceElements,
  currentUserAvatar,
  isSpaceOwner,
}: SpaceGridProps) => {
  const { onOpen } = useAddElementModal();
  const queryClient = useQueryClient();

  const onDelete = useCallback(
    async (id?: string) => {
      try {
        await customAxios.delete("/space/element", {
          data: {
            id,
          },
        });
        await queryClient.refetchQueries({ queryKey: ["get-space"] });
      } catch (e) {
        console.log(e);
      }
    },
    [queryClient]
  );
  const renderGrid = () => {
    const otherUsersPos: number[] = [];
    const otherUsersName: string[] = [];
    const otherUsersAvatar: string[] = [];
    const elements: number[] = [];
    spaceElements.forEach((me) => {
      elements.push(me.x * width + me.y);
    });
    const grid = [];

    users.forEach((user) => {
      otherUsersPos.push(user.x * width + user.y);
      otherUsersName.push(user.username);
      otherUsersAvatar.push(user.userAvatar);
    });

    for (let x = 0; x < width; x++) {
      const row = [];
      for (let y = 0; y < height; y++) {
        const isUser = x == currentUserX && y == currentUserY;
        const isOtherUser = otherUsersPos.includes(x * width + y);
        const otherUser =
          otherUsersName[
            otherUsersPos.findIndex((val) => val === x * width + y)
          ];
        const otherUserAvatar =
          otherUsersAvatar[
            otherUsersPos.findIndex((val) => val === x * width + y)
          ];
        const isElement = elements.includes(x * width + y);
        const spaceElement = spaceElements.find(
          (se) => se.x === x && se.y === y
        );
        const cellClass = `w-12 h-12 border border-zinc-200 flex items-center justify-center cursor-pointer group relative`;
        row.push(
          <div key={`${x}-${y}`} className={cellClass}>
            {isUser && (
              <div className="flex justify-center items-center relative">
                <p className="text-sm text-muted-foreground absolute bg-gray-200 shadow-md -top-8 rounded-lg p-1">
                  {currentUserName}
                </p>
                {currentUserAvatar ? (
                  <img
                    className="w-12 h-12 rounded-full"
                    src={currentUserAvatar}
                    alt="user-avatar"
                  />
                ) : (
                  <div className="w-12 h-12 rounded-full bg-red-400" />
                )}
              </div>
            )}
            {isOtherUser && (
              <div className="flex justify-center items-center relative">
                <p className="text-sm text-muted-foreground absolute bg-gray-200 shadow-md -top-8 rounded-lg p-1">
                  {isOtherUser && otherUser}
                </p>
                {otherUserAvatar ? (
                  <img
                    className="w-12 h-12 rounded-full"
                    src={otherUserAvatar}
                    alt="other-user-avatar"
                  />
                ) : (
                  <div className="w-12 h-12 rounded-full bg-red-400" />
                )}
              </div>
            )}
            {isElement && isSpaceOwner && (
              <div
                onClick={() => onDelete(spaceElement?.id)}
                className="flex items-center justify-center"
              >
                <img
                  src={spaceElement?.element.imageUrl}
                  alt="element"
                  className="w-12 h-12 group-hover:opacity-30 transition duration-300"
                />
                <Trash2 className="absolute opacity-0 group-hover:opacity-100 duration-300" />
              </div>
            )}
            {isElement && !isSpaceOwner && (
              <div className="flex items-center justify-center">
                <img
                  src={spaceElement?.element.imageUrl}
                  alt="element"
                  className="w-12 h-12"
                />
              </div>
            )}
            {!isUser && !otherUser && !isElement && isSpaceOwner && (
              <Plus
                onClick={() => onOpen(x, y)}
                size={20}
                className="opacity-0 group-hover:opacity-100 text-muted-foreground duration-300"
              />
            )}
          </div>
        );
      }
      grid.push(
        <div key={x} className="flex">
          {row}
        </div>
      );
    }
    return grid;
  };

  return <div className="rounded-lg h-[750px]">{renderGrid()}</div>;
};
