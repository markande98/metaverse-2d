import { Router } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import { compare, hash } from "../../script";
import { adminRouter } from "./admin";
import { spaceRouter } from "./space";
import { userRouter } from "./user";

import { db } from "@repo/db/client";
import { User } from "@prisma/client";
import { userMiddleWare } from "../../middleware/user";
import { signInSchema, signUpSchema } from "../../types";
import { ACCESS_TOKEN, JWT_SECRET, REFRESH_TOKEN } from "../../utils/config";
import { generateAccessToken } from "../../utils/helper";

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
      user: user,
      message: "User created!, try sign in",
    });
  } catch {
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
      res.status(400).json({
        message: "User not found",
      });
      return;
    }

    const isValid = await compare(password, user.password);
    if (!isValid) {
      res.status(400).json({
        message: "Invalid Password",
      });
      return;
    }
    const accessToken = generateAccessToken(user);
    res.cookie(ACCESS_TOKEN, accessToken, {
      httpOnly: true,
      secure: true,
      path: "/",
    });
    const refreshToken = jwt.sign(user, JWT_SECRET, { expiresIn: "1d" });
    res.cookie(REFRESH_TOKEN, refreshToken, {
      httpOnly: true,
      secure: true,
      path: "/",
    });
    res.status(200).json({
      user,
      message: "user logged in successfully",
    });
  } catch (e) {
    res.status(500).json({
      message: "Internal server error",
    });
  }
});

router.post("/signout", async (req, res) => {
  res.cookie(ACCESS_TOKEN, "", {
    httpOnly: true,
    secure: true,
    path: "/",
    expires: new Date(0),
  });
  res.cookie(REFRESH_TOKEN, "", {
    httpOnly: true,
    secure: true,
    path: "/",
    expires: new Date(0),
  });
  res.status(200).json({
    message: "successfully logged out",
  });
});

router.get("/elements", async (req, res) => {
  const elements = await db.element.findMany();
  res.json({
    elements: elements.map((e) => ({
      id: e.id,
      width: e.width,
      height: e.height,
      imageUrl: e.imageUrl,
      static: e.static,
    })),
  });
});
router.get("/avatars", async (req, res) => {
  const avatars = await db.avatar.findMany();
  res.json({
    avatars: avatars.map((avatar) => ({
      id: avatar.id,
      imageUrl: avatar.imageUrl,
      name: avatar.name,
    })),
  });
});

router.get("/generate-token", async (req, res) => {
  const refreshToken: string = req.cookies["refreshToken"];
  try {
    if (!refreshToken) {
      res.status(400).json({ message: "Verification Error" });
      return;
    }
    const user = jwt.verify(refreshToken, JWT_SECRET) as JwtPayload as User;
    const accessToken = generateAccessToken({
      id: user.id,
      username: user.username,
      password: user.password,
      avatarId: user.avatarId,
      role: user.role,
    });
    res.cookie(ACCESS_TOKEN, accessToken, {
      httpOnly: true,
      secure: true,
      path: "/",
    });
    res.status(200).json({ message: "Token refreshed successfully" });
  } catch (e) {
    res.status(400).json({
      message: "Something went wrong!",
    });
  }
});

router.get("/current-user", userMiddleWare, async (req, res) => {
  const userId = req.userId;
  const accessToken = req.cookies["accessToken"];
  try {
    const user = await db.user.findUnique({
      where: {
        id: userId,
      },
    });
    if (!user) {
      res.status(400).json({
        message: "user not found",
      });
      return;
    }
    res.status(200).json({
      id: user.id,
      username: user.username,
      role: user.role,
      avatarId: user.avatarId,
      token: accessToken,
    });
  } catch (e) {
    res.status(400).json({
      message: "user not found",
    });
  }
});

router.use("/user", userRouter);
router.use("/space", spaceRouter);
router.use("/admin", adminRouter);
