import { useParams } from "react-router-dom";
import { useCurrentUser } from "../auth/hooks/use-current-user";
import { useGetSpace } from "./hooks/use-get-space";
import { SpaceRoomView } from "./space-room-view";
import { useEffect, useState } from "react";

export const SpaceRoom = () => {
  const [token, setToken] = useState(null);
  const { spaceId } = useParams();
  const { isError, space, isPending } = useGetSpace(spaceId);
  const user = useCurrentUser();
  useEffect(() => {
    if (user?.token) {
      setToken(user.token);
    }
  }, [user?.token]);

  if (isError || isPending)
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
  return (
    <SpaceRoomView
      spaceId={spaceId!}
      token={token}
      width={width}
      height={height}
      spaceName={space?.name}
      currentUsername={user.username}
    />
  );
};
