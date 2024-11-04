import { Router } from "express";
import { adminMiddleWare } from "../../middleware/admin";
import {
  CreateAvatarSchema,
  CreateElementSchema,
  CreateMapSchema,
  UpdateElementSchema,
} from "../../types";
import { db } from "@repo/db/client";

export const adminRouter = Router();

adminRouter.post("/element", adminMiddleWare, async (req, res) => {
  const parsedData = CreateElementSchema.safeParse(req.body);
  if (!parsedData.success) {
    res.status(400).json({
      message: "Validation failed",
    });
    return;
  }
  const element = await db.element.create({
    data: {
      width: parsedData.data.width,
      height: parsedData.data.height,
      imageUrl: parsedData.data.imageUrl,
      static: parsedData.data.static,
    },
  });

  res.json({
    id: element.id,
  });
});

adminRouter.put("/element/:elementId", adminMiddleWare, async (req, res) => {
  const parsedData = UpdateElementSchema.safeParse(req.body);

  if (!parsedData.success) {
    res.status(400).json({ message: "Validation failed" });
    return;
  }
  await db.element.update({
    where: {
      id: req.params.elementId,
    },
    data: {
      imageUrl: parsedData.data.imageUrl,
    },
  });
});

adminRouter.post("/avatar", adminMiddleWare, async (req, res) => {
  const parsedData = CreateAvatarSchema.safeParse(req.body);

  if (!parsedData.success) {
    res.status(400).json({ message: "Validation failed" });
    return;
  }
  const avatar = await db.avatar.create({
    data: {
      imageUrl: parsedData.data.imageUrl,
      name: parsedData.data.name,
    },
  });
  res.json({
    avatarId: avatar.id,
  });
});

adminRouter.post("/map", adminMiddleWare, async (req, res) => {
  const parsedData = CreateMapSchema.safeParse(req.body);
  if (!parsedData.success) {
    res.status(400).json({ message: "Validation failed" });
    return;
  }
  const map = await db.map.create({
    data: {
      name: parsedData.data.name,
      thumbnail: parsedData.data.thumbnail,
      width: parseInt(parsedData.data.dimensions.split("x")[0]),
      height: parseInt(parsedData.data.dimensions.split("x")[1]),
      mapElements: {
        create: parsedData.data.defaultElements.map((e) => ({
          elementId: e.elementId,
          x: e.x,
          y: e.y,
        })),
      },
    },
  });
  res.json({
    id: map.id,
  });
});
