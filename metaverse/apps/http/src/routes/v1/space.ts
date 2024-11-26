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
      name: true,
      thumbnail: true,
    },
  });
  if (!map) {
    res.status(400).json({ message: "Map not found" });
    return;
  }
  let space = await db.$transaction(async () => {
    const space = await db.space.create({
      data: {
        name: map.name,
        width: map.width,
        height: map.height,
        creatorId: req.userId!,
        thumbnail: map.thumbnail,
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
  try {
    await db.$transaction(async () => {
      await db.spaceElements.deleteMany({
        where: {
          spaceId: req.params.spaceId,
        },
      });
      await db.space.delete({
        where: {
          id: req.params.spaceId,
        },
      });
    });
    res.json({ message: "space deleted" });
  } catch {
    res.status(500).json({ message: "error occured!" });
  }
});

spaceRouter.get("/all", userMiddleWare, async (req, res) => {
  const spaces = await db.space.findMany({
    where: {
      creatorId: req.userId,
    },
  });
  res.json({
    spaces: spaces.map((s) => ({
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

  if (
    parsedData.data.x < 0 ||
    parsedData.data.x > space.width ||
    parsedData.data.y < 0 ||
    parsedData.data.y > space.height
  ) {
    res.status(400).json({ message: "Invalid coordinates" });
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

spaceRouter.get("/maps", async (req, res) => {
  try {
    const maps = await db.map.findMany();
    res.status(200).json(maps);
  } catch {
    res.status(500).json({
      message: "Something went wrong",
    });
  }
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
      creator: true,
    },
  });

  if (!space) {
    res.status(400).json({ message: "Space not found" });
    return;
  }
  res.json({
    name: space.name,
    thumbnail: space.thumbnail,
    creator: space.creator,
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
