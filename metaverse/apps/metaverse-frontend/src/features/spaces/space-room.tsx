import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useCurrentUser } from "../auth/hooks/use-current-user";
import { useGetSpace } from "./hooks/use-get-space";
import { SpaceRoomView } from "./space-room-view";

export const SpaceRoom = () => {
  const [token, setToken] = useState("");
  const { spaceId } = useParams();
  const { isError, space } = useGetSpace(spaceId);
  const user = useCurrentUser();
  useEffect(() => {
    if (user?.token) {
      setToken(user.token);
    }
  }, [user?.token]);

  if (isError || space === undefined)
    return (
      <div className="min-h-screen flex justify-center">
        <p className="text-3xl text-muted-foreground text-slate-400 pt-16">
          No Space found!
        </p>
      </div>
    );
  if (!token) return null;

  const height = Number(space?.dimensions.split("x")[0]);
  const width = Number(space?.dimensions.split("x")[1]);
  const isSpaceOwner = user?.id === space.creator.id;

  return (
    <SpaceRoomView
      spaceId={spaceId!}
      token={token}
      width={width}
      height={height}
      currentUsername={user?.username}
      spaceElements={space.elements}
      currentUserAvatar={user?.avatar.imageUrl}
      isSpaceOwner={isSpaceOwner}
    />
  );
};
