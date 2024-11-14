import { useEffect, useRef, useState } from "react";

export const useDrawSpace = ({
  xPos,
  yPos,
  users,
  handleMove,
  height,
  width,
  currentUserName,
}: {
  xPos: number;
  yPos: number;
  users: any;
  handleMove: (x: number, y: number) => void;
  height: number;
  width: number;
  currentUserName: string;
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [position, setPosition] = useState({ x: xPos, y: yPos });
  // Constants for map and avatar
  const MAP_WIDTH = height * 20;
  const MAP_HEIGHT = width * 20;
  const AVATAR_SIZE = 20;
  const MOVE_SPEED = 20;
  // Handle keyboard controls
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      setPosition((prev) => {
        const newPos = { ...prev };

        switch (e.key) {
          case "ArrowUp":
            newPos.y = Math.max(20, prev.y - MOVE_SPEED);
            handleMove(newPos.x, newPos.y);

            break;
          case "ArrowDown":
            newPos.y = Math.min(MAP_HEIGHT - 20, prev.y + MOVE_SPEED);
            handleMove(newPos.x, newPos.y);

            break;
          case "ArrowLeft":
            newPos.x = Math.max(20, prev.x - MOVE_SPEED);
            handleMove(newPos.x, newPos.y);

            break;
          case "ArrowRight":
            newPos.x = Math.min(MAP_WIDTH - 20, prev.x + MOVE_SPEED);
            handleMove(newPos.x, newPos.y);

            break;
        }
        return newPos;
      });
    };
    setPosition({ x: xPos, y: yPos });
    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [xPos, yPos, handleMove, MAP_HEIGHT, MAP_WIDTH]);

  // Draw the map and avatar
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");

    if (ctx && canvas) {
      // Clear canvas
      ctx.clearRect(0, 0, MAP_WIDTH, MAP_HEIGHT);

      // Draw background
      ctx.fillStyle = "#f0f0f0";
      ctx.fillRect(0, 0, MAP_WIDTH, MAP_HEIGHT);

      // Draw grid lines
      ctx.strokeStyle = "#ddd";
      ctx.lineWidth = 1;

      // Vertical lines
      for (let x = 0; x < MAP_WIDTH; x += 20) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, MAP_HEIGHT);
        ctx.stroke();
      }

      // Horizontal lines
      for (let y = 0; y < MAP_HEIGHT; y += 20) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(MAP_WIDTH, y);
        ctx.stroke();
      }
      ctx.font = "16px Mono";
      ctx.fillStyle = "white";
      ctx.strokeStyle = "black";
      ctx.lineWidth = 5;
      ctx.strokeText(currentUserName, position.x - 20, position.y - 15);
      ctx.fillText(currentUserName, position.x - 20, position.y - 15);
      // Draw avatar
      ctx.beginPath();
      ctx.arc(position.x, position.y, AVATAR_SIZE / 2, 0, Math.PI * 2);
      ctx.fillStyle = "#4CAF50";
      ctx.fill();
      ctx.strokeStyle = "#388E3C";
      ctx.lineWidth = 2;
      ctx.stroke();

      // Draw other user
      users.forEach((user) => {
        if (!user.x) {
          return;
        }
        ctx.font = "16px Mono";
        ctx.fillStyle = "white";
        ctx.strokeStyle = "black";
        ctx.lineWidth = 5;
        ctx.strokeText(user.username, user.x * 20 - 20, user.y * 20 - 15);
        ctx.fillText(user.username, user.x * 20 - 20, user.y * 20 - 15);

        ctx.beginPath();
        ctx.arc(user.x * 20, user.y * 20, AVATAR_SIZE / 2, 0, Math.PI * 2);
        ctx.fillStyle = "#4ECDC4";
        ctx.fill();
        ctx.strokeStyle = "#367F3C";
        ctx.lineWidth = 2;
        ctx.stroke();
      });
    }
  }, [position, users, MAP_HEIGHT, MAP_WIDTH, currentUserName]);

  return {
    canvasRef,
    position,
    MAP_HEIGHT,
    MAP_WIDTH,
  };
};
