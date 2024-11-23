import React from "react";

export const handleWebSocketMessage = (
  message: any,
  setCurrentUser: React.Dispatch<
    React.SetStateAction<{
      x: number;
      y: number;
    }>
  >,
  setUsers: React.Dispatch<React.SetStateAction<any>>
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
  }
};
