import { Card } from "@/components/ui/card";
import { useCallback, useEffect, useRef, useState } from "react";
import { useDrawSpace } from "./hooks/use-draw-space";
import { handleWebSocketMessage } from "./lib/handle-web-socket-message";

const WS_URL = "ws://localhost:3001";

interface SpaceRoomViewProps {
  spaceId: string;
  token: string;
  height: number;
  width: number;
  spaceName?: string;
  creatorId?: string;
  currentUserName: string;
}

export const SpaceRoomView = ({
  spaceId,
  token,
  height,
  width,
  spaceName,
  creatorId,
  currentUserName,
}: SpaceRoomViewProps) => {
  const wsRef = useRef<WebSocket | null>(null);
  const [currentUser, setCurrentUser] = useState<{
    x: number;
    y: number;
    userId: string;
  }>({
    x: 20,
    y: 20,
    userId: creatorId!,
  });
  const [users, setUsers] = useState(new Map());
  const handleMove = useCallback(
    (x: number, y: number) => {
      wsRef.current?.send(
        JSON.stringify({
          type: "move",
          payload: {
            x: x / 20,
            y: y / 20,
            userId: currentUser.userId,
          },
        })
      );
    },
    [currentUser.userId]
  );

  const { canvasRef, MAP_HEIGHT, MAP_WIDTH } = useDrawSpace({
    height,
    width,
    xPos: currentUser.x,
    yPos: currentUser.y,
    users,
    handleMove,
    currentUserName,
  });
  useEffect(() => {
    wsRef.current = new WebSocket(WS_URL);

    wsRef.current.onopen = () => {
      wsRef.current?.send(
        JSON.stringify({
          type: "join",
          payload: {
            spaceId,
            token,
          },
        })
      );
    };

    wsRef.current.onmessage = (event: any) => {
      const message = JSON.parse(event.data);
      handleWebSocketMessage(message, setCurrentUser, setUsers);
    };

    return () => {
      if (wsRef.current) {
        wsRef.current.close();
      }
    };
  }, [spaceId, token]);
  return (
    <Card className="p-4 w-fit min-h-screen">
      <div className="space-y-4">
        <div className="text-sm text-gray-500">Spacename: {spaceName}</div>
        <canvas
          ref={canvasRef}
          width={MAP_WIDTH}
          height={MAP_HEIGHT}
          className="border border-gray-200 rounded-lg"
        />
      </div>
    </Card>
  );
};
