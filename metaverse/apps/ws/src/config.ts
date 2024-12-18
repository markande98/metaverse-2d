import dotenv from "dotenv";

dotenv.config();

export const JWT_SECRET = process.env.JWT_SECRET;
export const WS_PORT = process.env.WS_PORT;
