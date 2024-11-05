import { WebSocket } from "ws";
import { RoomManager } from "./RoomManager";
import { OutgoingMessage } from "./types";
import { db } from "@repo/db/client";
import jwt, { JwtPayload } from "jsonwebtoken";
import { JWT_SECRET } from "./config";

function generateRandomId(length: number) {
  const res = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  let ans = "";

  for (let i = 0; i < length; i++) {
    ans += res.charAt(Math.floor(Math.random() * res.length));
  }
  return ans;
}

export class User {
  public id: string;
  private spaceId?: string;
  private userId?: string;
  private x: number;
  private y: number;
  constructor(private ws: WebSocket) {
    this.id = generateRandomId(10);
    this.x = 0;
    this.y = 0;
    this.initHandlers();
  }

  initHandlers() {
    this.ws.on("message", async (data) => {
      const parsedData = JSON.parse(data.toString());
      switch (parsedData.type) {
        case "join":
          const spaceId = parsedData.payload.spaceId;
          const token = parsedData.payload.token;
          const userId = (jwt.verify(token, JWT_SECRET) as JwtPayload).userId;
          this.userId = userId;
          if (!this.userId) {
            this.ws.close();
            return;
          }
          const space = await db.space.findFirst({
            where: {
              id: spaceId,
            },
          });
          if (!space) {
            this.ws.close();
            return;
          }
          this.spaceId = spaceId;
          RoomManager.getInstance().addUser(spaceId, this);
          this.x = Math.floor(Math.random() * space.width);
          this.y = Math.floor(Math.random() * space.width);
          this.send({
            type: "space-joined",
            payload: {
              spawn: {
                x: this.x,
                y: this.y,
              },
              users:
                RoomManager.getInstance()
                  .rooms.get(spaceId)
                  ?.filter((x) => x.id !== this.id)
                  ?.map((u) => ({ id: u.id })) ?? [],
            },
          });
          RoomManager.getInstance().broadcast(
            {
              type: "user-joined",
              payload: {
                x: this.x,
                y: this.y,
                userId: this.userId,
              },
            },
            this,
            this.spaceId!
          );
          break;
        case "move":
          const moveX = parsedData.payload.x;
          const moveY = parsedData.payload.y;
          const xD = Math.abs(this.x - moveX);
          const yD = Math.abs(this.y - moveY);
          if ((xD == 1 && yD == 0) || yD == 1 || xD == 0) {
            this.x = moveX;
            this.y = moveY;
            RoomManager.getInstance().broadcast(
              {
                type: "movement",
                payload: {
                  x: this.x,
                  y: this.y,
                },
              },
              this,
              this.spaceId!
            );
            return;
          }
          this.send({
            type: "movement-rejected",
            payload: {
              x: this.x,
              y: this.y,
            },
          });
      }
    });
  }

  destroy() {
    RoomManager.getInstance().broadcast(
      {
        type: "user-left",
        payload: {
          userId: this.userId,
        },
      },
      this,
      this.spaceId!
    );
    RoomManager.getInstance().removeUser(this.spaceId!, this);
  }
  send(payload: OutgoingMessage) {
    this.ws.send(JSON.stringify(payload));
  }
}
