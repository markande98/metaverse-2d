import { MessageType } from "@/features/types";
import { QueryClient } from "@tanstack/react-query";
import React from "react";

export const handleWebSocketMessage = async (
  message: any,
  setCurrentUser: React.Dispatch<
    React.SetStateAction<{
      x: number;
      y: number;
    }>
  >,
  setUsers: React.Dispatch<React.SetStateAction<any>>,
  setMessages: React.Dispatch<React.SetStateAction<MessageType[]>>,
  queryClient: QueryClient
) => {
  switch (message.type) {
    case "space-joined":
      setCurrentUser({
        x: message.payload.spawn.x,
        y: message.payload.spawn.y,
      });

      const userMap = new Map();
      message.payload.users.forEach((user: any) => {
        userMap.set(user.userId, user);
      });
      setUsers(userMap);
      const msg: MessageType[] = [];
      message.payload.messages.forEach((m: MessageType) => {
        msg.push(m);
      });
      setMessages(msg);
      break;
    case "user-joined":
      setUsers((prev) => {
        const newUsers = new Map(prev);
        if (message.payload.userId) {
          newUsers.set(message.payload.userId, {
            x: message.payload.x,
            y: message.payload.y,
            userId: message.payload.userId,
            username: message.payload.username,
            userAvatar: message.payload.userAvatar,
          });
        }
        return newUsers;
      });
      break;
    case "message":
      setMessages((prev) => {
        const newMessages = [
          ...prev,
          {
            username: message.payload.username,
            userAvatar: message.payload.userAvatar,
            message: message.payload.message,
          },
        ];
        return newMessages;
      });
      break;
    case "movement":
      setUsers((prev) => {
        const newUsers = new Map(prev);
        const user = newUsers.get(message.payload.userId);
        if (user) {
          newUsers.set(message.payload.userId, {
            x: message.payload.x,
            y: message.payload.y,
            userId: message.payload.userId,
            username: message.payload.username,
            userAvatar: message.payload.userAvatar,
          });
        }
        return newUsers;
      });
      break;
    case "movement-rejected":
      setCurrentUser((prev) => ({
        ...prev,
        x: message.payload.x,
        y: message.payload.y,
      }));
      break;
    case "user-left":
      setUsers((prev) => {
        const newUsers = new Map(prev);
        newUsers.delete(message.payload.userId);
        return newUsers;
      });
      break;
    case "user-movement":
      setCurrentUser({
        x: message.payload.x,
        y: message.payload.y,
      });
      break;
    case "element-update":
      await queryClient.refetchQueries({ queryKey: ["get-space"] });
      break;
  }
};
