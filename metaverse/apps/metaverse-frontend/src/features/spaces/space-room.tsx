import { useParams } from "react-router-dom";
import { useCurrentUser } from "../auth/hooks/use-current-user";
import { useGetSpace } from "./hooks/use-get-space";
import { SpaceRoomView } from "./space-room-view";
import { useEffect, useState } from "react";

export const SpaceRoom = () => {
  const [token, setToken] = useState(null);
  const { spaceId } = useParams();
  const { isError } = useGetSpace(spaceId);
  const user = useCurrentUser();
  useEffect(() => {
    if (user?.token) {
      setToken(user.token);
    }
  }, [user?.token]);

  if (isError) return <div>No space found</div>;
  if (!token) return null;
  return <SpaceRoomView spaceId={spaceId!} token={token} />;
};
