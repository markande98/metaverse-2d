import { Router } from "express";
import {
  AddElementSchema,
  CreateElementSchema,
  createSpaceSchema,
  DeleteElementSchema,
} from "../../types";
import { db } from "@repo/db/client";
import { userMiddleWare } from "../../middleware/user";

export const spaceRouter = Router();

spaceRouter.post("/", userMiddleWare, async (req, res) => {
  const parsedData = createSpaceSchema.safeParse(req.body);

  if (!parsedData.success) {
    res.status(400).json({ message: "Validation failed" });
    return;
  }
  if (!parsedData.data.mapId) {
    const space = await db.space.create({
      data: {
        name: parsedData.data.name,
        width: parseInt(parsedData.data.dimensions.split("x")[0]),
        height: parseInt(parsedData.data.dimensions.split("x")[1]),
        creatorId: req.userId!,
      },
    });
    res.json({
      spaceId: space.id,
    });
    return;
  }
  const map = await db.map.findUnique({
    where: {
      id: parsedData.data.mapId,
    },
    select: {
      mapElements: true,
      width: true,
      height: true,
    },
  });
  if (!map) {
    res.status(400).json({ message: "Map not found" });
    return;
  }

  let space = await db.$transaction(async () => {
    const space = await db.space.create({
      data: {
        name: parsedData.data.name,
        width: map.width,
        height: map.height,
        creatorId: req.userId!,
      },
    });
    await db.spaceElements.createMany({
      data: map.mapElements.map((m) => ({
        elementId: m.elementId,
        spaceId: space.id,
        x: m.x!,
        y: m.y!,
      })),
    });
    return space;
  });
  res.json({ spaceId: space.id });
});

spaceRouter.delete("/:spaceId", userMiddleWare, async (req, res) => {
  const space = await db.space.findUnique({
    where: {
      id: req.params.spaceId,
    },
  });

  if (!space) {
    res.status(400).json({ message: "Space not found" });
    return;
  }
  if (space.creatorId !== req.userId) {
    res.status(403).json({ message: "Unauthorized" });
    return;
  }

  await db.space.delete({
    where: {
      id: req.params.spaceId,
    },
  });
  res.json({ message: "space deleted" });
});

spaceRouter.get("/all", userMiddleWare, async (req, res) => {
  const spaces = await db.space.findMany({
    where: {
      creatorId: req.userId,
    },
  });
  res.json({
    space: spaces.map((s) => ({
      id: s.id,
      name: s.name,
      thumbnail: s.thumbnail,
      dimensions: `${s.width}x${s.height}`,
    })),
  });
});

spaceRouter.post("/element", userMiddleWare, async (req, res) => {
  const parsedData = AddElementSchema.safeParse(req.body);

  if (!parsedData.success) {
    res.status(400).json({ message: "Validation failed" });
    return;
  }
  const space = await db.space.findUnique({
    where: {
      id: parsedData.data.spaceId,
      creatorId: req.userId,
    },
    select: {
      width: true,
      height: true,
    },
  });

  if (!space) {
    res.status(400).json({ message: "Space not found" });
    return;
  }

  await db.spaceElements.create({
    data: {
      elementId: parsedData.data.elementId,
      spaceId: parsedData.data.spaceId,
      x: parsedData.data.x,
      y: parsedData.data.y,
    },
  });

  res.status(200).json({ message: "Element added to space" });
});

spaceRouter.delete("/element", userMiddleWare, async (req, res) => {
  const parsedData = DeleteElementSchema.safeParse(req.body);

  if (!parsedData.success) {
    res.status(400).json({ message: "Validation failed" });
    return;
  }

  const spaceElement = await db.spaceElements.findFirst({
    where: {
      id: parsedData.data.id,
    },
    include: {
      space: true,
    },
  });

  if (spaceElement?.space.creatorId !== req.userId) {
    res.status(403).json({ message: "Unauthorized" });
    return;
  }

  await db.spaceElements.delete({
    where: {
      id: parsedData.data.id,
    },
  });
  res.json({
    message: "Element deleted",
  });
});

spaceRouter.get("/:spaceId", async (req, res) => {
  const space = await db.space.findUnique({
    where: {
      id: req.params.spaceId,
    },
    include: {
      elements: {
        include: {
          element: true,
        },
      },
    },
  });

  if (!space) {
    res.status(400).json({ message: "Space not found" });
    return;
  }
  res.json({
    dimensions: `${space.width}x${space.height}`,
    elements: space.elements.map((e) => ({
      id: e.id,
      x: e.x,
      y: e.y,
      element: {
        id: e.element.id,
        width: e.element.width,
        height: e.element.height,
        imageUrl: e.element.imageUrl,
        static: e.element.static,
      },
    })),
  });
});