import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import { router } from "./routes/v1";
import morgan from "morgan";

const app = express();
dotenv.config();

const PORT = Number(process.env.HTTP_PORT);

const allowedOrigins = [
  "http://metaverse-frontend:5173",
  "http://13.201.131.151:5173",
];

app.use(express.json());
app.use(cookieParser());
app.use(morgan("dev"));
app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin) return callback(null, true);

      if (allowedOrigins.indexOf(origin) !== -1) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);

app.use("/api/v1", router);

app.listen(PORT, "0.0.0.0", () => {
  console.log("Server running....", PORT);
});
