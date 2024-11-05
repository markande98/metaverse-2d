import { Router } from "express";
import { updateMetadataSchema } from "../../types";
import { userMiddleWare } from "../../middleware/user";
import { db } from "@repo/db/client";

export const userRouter = Router();

userRouter.post("/metadata", userMiddleWare, async (req, res) => {
  const parsedData = updateMetadataSchema.safeParse(req.body);
  if (!parsedData.success) {
    res.status(400).json({
      message: "Validation failed",
    });
    return;
  }
  try {
    await db.user.update({
      where: {
        id: req.userId,
      },
      data: {
        avatarId: parsedData.data?.avatarId,
      },
    });
    res.status(200).json({ message: "Metadata updated!" });
  } catch (e) {
    res.status(400).json({ message: "Internal server error" });
  }
});

userRouter.get("/metadata/bulk", async (req, res) => {
  const userIdString = (req.query.ids ?? "[]") as string;
  const userIds = userIdString.slice(1, userIdString.length - 1).split(",");

  const metadata = await db.user.findMany({
    where: {
      id: {
        in: userIds,
      },
    },
    select: {
      avatar: true,
      id: true,
    },
  });
  res.json({
    avatars: metadata.map((m) => ({
      userId: m.id,
      avatarId: m.avatar?.imageUrl,
    })),
  });
});
