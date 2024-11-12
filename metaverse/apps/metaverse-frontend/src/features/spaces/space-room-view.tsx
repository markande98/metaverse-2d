import { Card } from "@/components/ui/card";
import { useCallback, useEffect, useRef, useState } from "react";
import { useDrawSpace } from "./hooks/use-draw-space";
import { handleWebSocketMessage } from "./lib/handle-web-socket-message";

const WS_URL = "ws://localhost:3001";

interface SpaceRoomViewProps {
  spaceId: string;
  token: string;
}

export const SpaceRoomView = ({ spaceId, token }: SpaceRoomViewProps) => {
  const wsRef = useRef<WebSocket | null>(null);
  const [currentUser, setCurrentUser] = useState<{
    x: number;
    y: number;
    userId: string;
  }>({
    x: 20,
    y: 20,
    userId: "abcd",
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

  const { canvasRef, position, MAP_HEIGHT, MAP_WIDTH } = useDrawSpace({
    xPos: currentUser.x,
    yPos: currentUser.y,
    users,
    handleMove,
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
    <Card className="p-4 w-fit">
      <div className="space-y-4">
        <div className="text-sm text-gray-500">
          Use arrow keys to move the avatar
        </div>
        <canvas
          ref={canvasRef}
          width={MAP_WIDTH}
          height={MAP_HEIGHT}
          className="border border-gray-200 rounded-lg"
        />
        <div className="text-sm">
          Position: ({position.x}, {position.y})
        </div>
      </div>
    </Card>
  );
};
