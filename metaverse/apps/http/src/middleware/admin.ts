import { User } from "@prisma/client";

import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../utils/config";
import { NextFunction, Request, Response } from "express";

export const adminMiddleWare = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const accessToken = req.cookies["accessToken"];
  if (!accessToken) {
    res.status(403).json({
      message: "Unauthorized",
    });
    return;
  }

  try {
    const decoded = jwt.verify(accessToken, JWT_SECRET) as User;
    if (decoded.role !== "Admin") {
      console.log("reached-4");
      res.status(403).json({ message: "Unauthorized" });
      return;
    }

    req.userId = decoded.id;
    next();
  } catch (e) {
    res.status(403).json({ message: "Unauthorized" });
    return;
  }
};
