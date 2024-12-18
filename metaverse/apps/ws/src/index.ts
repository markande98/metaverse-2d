import { WebSocketServer } from "ws";
import { User } from "./User";
import { WS_PORT } from "./config";

const wss = new WebSocketServer({ port: Number(process.env.WS_PORT) });

wss.on("connection", (ws) => {
  let user: User | undefined;
  user = new User(ws);
  ws.on("error", console.error);

  ws.on("close", () => {
    user?.destroy();
  });
});
