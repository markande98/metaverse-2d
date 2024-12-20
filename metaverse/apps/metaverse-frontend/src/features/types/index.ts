import {
  Avatar,
  Element,
  Map,
  MapElements,
  Space,
  SpaceElements,
  User,
} from "@repo/db/client";
import z from "zod";

export const signupSchema = z.object({
  username: z.string().min(1),
  password: z.string().min(6),
  confirmPassword: z.string().min(6),
});

export const signinSchema = z.object({
  username: z.string().min(1),
  password: z.string().min(6),
});

export type currentUserType = {
  id: string;
  username: string;
  avatarId?: string;
  role: roleType;
  token: string;
  avatar: Avatar;
};

export const spaceJoinSchema = z.object({
  spaceId: z.string().min(6),
});

export const createSpaceSchema = z.object({
  name: z.string(),
  height: z.number().min(20, "To low!").max(40, "To high!"),
  width: z.number().min(20, "To low!").max(40, "To high!"),
  mapId: z.string().optional(),
});

export const createElementSchema = z.object({
  width: z.number().min(1, "greater than one").max(5, "smaller than five"),
  height: z.number().min(1, "greater than one").max(5, "smaller than five"),
  imageUrl: z.string(),
  static: z.boolean(),
});

export const createAvatarSchema = z.object({
  imageUrl: z.string(),
  name: z.string(),
});
export const updateAvatarSchema = z.object({
  avatarId: z.string(),
});

export const createMapSchema = z.object({
  thumbnail: z.string(),
  name: z.string(),
  dimensions: z.string().regex(/^[0-9]{1,4}x[0-9]{1,4}$/),
  defaultElements: z.array(
    z.object({
      elementId: z.string(),
      x: z.number(),
      y: z.number(),
    }),
  ),
});

export const updateElementSchema = z.object({
  imageUrl: z.string(),
});

type userInfoType = Omit<User, "password">;

export type spaceElementsInfo = SpaceElements & {
  element: Element;
};

export type spaceInfoWithCreatorAndElements = Pick<
  Space,
  "name" | "thumbnail"
> & {
  creator: userInfoType;
  dimensions: string;
  elements: spaceElementsInfo[];
};

interface space {
  id: string;
  name: string;
  thumbnail: string;
}

export type getUserOwnSpaces = Pick<space, "id" | "name" | "thumbnail"> & {
  dimensions: string;
};

export type getAdminElementSchema = Element[];
export type getAdminAvatarSchema = Avatar[];

export type mapWithElements = MapElements & {
  element: Element;
};

export type getMapElements = Map & {
  mapElements: mapWithElements[];
};

export type MessageType = {
  username: string;
  userAvatar: string;
  message: string;
};

export enum roleType {
  User,
  Admin,
}
