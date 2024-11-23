export const isElementPresent = async (
  val: number,
  spaceElements: number[]
) => {
  try {
    const index = spaceElements.findIndex((el) => el === val);
    if (index !== -1) {
      throw new Error("Element is present!");
    }
  } catch (e) {
    throw e;
  }
};
