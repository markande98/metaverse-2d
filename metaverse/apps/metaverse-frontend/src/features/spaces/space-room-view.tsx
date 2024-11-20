import { Card } from "@/components/ui/card";
import { useCallback, useEffect, useRef, useState } from "react";
import { SpaceGrid } from "./space-grid";
import { handleWebSocketMessage } from "./lib/handle-web-socket-message";

const WS_URL = "ws://localhost:3001";

interface SpaceRoomViewProps {
  spaceId: string;
  token: string;
  height: number;
  width: number;
  spaceName?: string;
  currentUsername: string;
}

export const SpaceRoomView = ({
  spaceId,
  token,
  height,
  width,
  spaceName,
  currentUsername,
}: SpaceRoomViewProps) => {
  const wsRef = useRef<WebSocket | null>(null);
  const [users, setUsers] = useState(new Map());
  const [currentUser, setCurrentUser] = useState<{
    x: number;
    y: number;
  }>({
    x: 0,
    y: 0,
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

  const handleMove = useCallback(
    (newX: number, newY: number) => {
      if (!currentUser) return;
      wsRef.current?.send(
        JSON.stringify({
          type: "move",
          payload: {
            x: newX,
            y: newY,
          },
        })
      );
    },
    [currentUser]
  );

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      const key = e.key.toLowerCase();

      switch (key) {
        case "arrowleft":
          handleMove(currentUser.x, Math.max(0, currentUser.y - 1));
          break;
        case "arrowright":
          handleMove(currentUser.x, Math.min(height, currentUser.y + 1));
          break;
        case "arrowup":
          handleMove(Math.max(0, currentUser.x - 1), currentUser.y);
          break;
        case "arrowdown":
          handleMove(Math.min(width, currentUser.x + 1), currentUser.y);
          break;
      }
    };

    window.addEventListener("keydown", handleKeyPress);

    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [currentUser.x, currentUser.y, height, width, handleMove]);

  return (
    <Card className="p-4 w-fit min-h-screen">
      <div className="space-y-4">
        <div className="text-sm text-gray-500">Spacename: {spaceName}</div>
        <SpaceGrid
          width={width}
          height={height}
          currentUserX={currentUser.x}
          currentUserY={currentUser.y}
          currentUserName={currentUsername}
          users={users}
        />
      </div>
    </Card>
  );
};
