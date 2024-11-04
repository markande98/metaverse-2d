import { Router } from "express";
import { updateMetadataSchema } from "../../types";
import { useMiddleWare } from "../../middleware/user";
import { db } from "@repo/db/client";

export const userRouter = Router();

userRouter.post("/metadata", useMiddleWare, async (req, res) => {
  const parsedData = updateMetadataSchema.safeParse(req.body);
  if (!parsedData.success) {
    res.status(403).json({
      message: "Validation failed",
    });
  }
  await db.user.update({
    where: {
      id: req.userId,
    },
    data: {
      avatarId: parsedData.data?.avatarId,
    },
  });
  res.status(200).json({ message: "Metadata updated!" });
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
