import { db } from "@repo/db/client";

export const isElementPresent = async (
  x: number,
  y: number,
  spaceId: string
): Promise<boolean> => {
  try {
    const space = await db.space.findUnique({
      where: {
        id: spaceId,
      },
      include: {
        elements: true,
      },
    });

    const index = space?.elements.findIndex(
      (element) => element.x === x && element.y === y
    );
    if (index != -1) {
      throw new Error("Element found!");
      return true;
    }
    return false;
  } catch (e) {
    throw e;
    return true;
  }
};
