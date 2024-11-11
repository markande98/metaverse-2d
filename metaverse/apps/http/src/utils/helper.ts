import { User } from "@prisma/client";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "./config";

export const generateAccessToken = (user: User) => {
  return jwt.sign(user, JWT_SECRET, { expiresIn: "15m" });
};
