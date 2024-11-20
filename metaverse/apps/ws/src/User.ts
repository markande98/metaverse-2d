import { WebSocket } from "ws";
import { RoomManager } from "./RoomManager";
import { OutgoingMessage } from "./types";
import { db } from "@repo/db/client";
import jwt, { JwtPayload } from "jsonwebtoken";
import { JWT_SECRET } from "./config";

export class User {
  private spaceId?: string;
  private x: number;
  private y: number;
  constructor(
    private ws: WebSocket,
    public id: string,
    public username: string
  ) {
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
          try {
            const user = jwt.verify(token, JWT_SECRET) as JwtPayload;
            this.username = user.username;
            this.id = user.id;
            if (!this.id) {
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
                userId: this.id,
                username: this.username,
                users:
                  RoomManager.getInstance()
                    .rooms.get(spaceId)
                    ?.filter((x) => x.id !== this.id)
                    ?.map((u) => ({
                      userId: u.id,
                      x: u.x,
                      y: u.y,
                      username: u.username,
                    })) ?? [],
              },
            });
            RoomManager.getInstance().broadcast(
              {
                type: "user-joined",
                payload: {
                  x: this.x,
                  y: this.y,
                  userId: this.id,
                  username: this.username,
                },
              },
              this,
              this.spaceId!
            );
          } catch (e: any) {
            console.log(e.message);
          }
          break;
        case "move":
          const moveX = parsedData.payload.x;
          const moveY = parsedData.payload.y;
          const xD = Math.abs(this.x - moveX);
          const yD = Math.abs(this.y - moveY);
          if ((xD == 1 && yD == 0) || yD == 1 || xD == 0) {
            this.x = moveX;
            this.y = moveY;
            this.send({
              type: "user-movement",
              payload: {
                x: this.x,
                y: this.y,
                userId: this.id,
                username: this.username,
              },
            });
            RoomManager.getInstance().broadcast(
              {
                type: "movement",
                payload: {
                  x: this.x,
                  y: this.y,
                  userId: this.id,
                  username: this.username,
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
          userId: this.id,
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
