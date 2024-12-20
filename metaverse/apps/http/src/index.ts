import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import { router } from "./routes/v1";
import morgan from "morgan";

const app = express();
dotenv.config();

const PORT = Number(process.env.HTTP_PORT);

app.use(express.json());
app.use(cookieParser());
app.use(morgan("dev"));
app.use(
  cors({
    origin: "http://metaverse-frontend:5173",
    credentials: true,
  })
);

app.use("/api/v1", router);

app.listen(PORT, "0.0.0.0", () => {
  console.log("Server running....", PORT);
});
