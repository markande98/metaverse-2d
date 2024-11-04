import { Router } from "express";
import { userRouter } from "./user";
import { spaceRouter } from "./space";
import { adminRouter } from "./admin";
import jwt from "jsonwebtoken";
import { hash, compare } from "../../script";

import { db } from "@repo/db/client";
import { signInSchema, signUpSchema } from "../../types";
import { JWT_SECRET } from "../../config";

export const router = Router();

router.post("/signup", async (req, res) => {
  const parsedData = signUpSchema.safeParse(req.body);

  if (!parsedData.success) {
    res.status(400).json({
      message: "Validation failed",
    });
    return;
  }

  try {
    const { username, password, type } = parsedData.data;

    const hashedPassword = await hash(password);
    const user = await db.user.create({
      data: {
        username,
        password: hashedPassword,
        role: type === "admin" ? "Admin" : "User",
      },
    });

    res.status(200).json({
      userId: user.id,
    });
  } catch (e) {
    res.status(400).json({
      message: "User already exists",
    });
  }
});

router.post("/signin", async (req, res) => {
  const parsedData = signInSchema.safeParse(req.body);

  if (!parsedData.success) {
    res.status(400).json({
      message: "Invalid input",
    });
    return;
  }

  try {
    const { username, password } = parsedData.data;
    const user = await db.user.findUnique({
      where: {
        username,
      },
    });

    if (!user) {
      res.status(403).json({
        message: "User not found",
      });
      return;
    }

    const isValid = await compare(password, user.password);
    if (!isValid) {
      res.status(403).json({
        message: "Invalid Password",
      });
      return;
    }
    const token = jwt.sign(
      {
        userId: user.id,
        role: user.role,
      },
      JWT_SECRET
    );
    res.status(200).json({
      token,
    });
  } catch (e) {
    res.status(500).json({
      message: "Internal server error",
    });
  }
});

router.get("/avatars", (req, res) => {});

router.get("/elements", (req, res) => {});

router.use("/user", userRouter);
router.use("/space", spaceRouter);
router.use("/admin", adminRouter);
