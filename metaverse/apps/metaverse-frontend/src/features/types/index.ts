import z from "zod";
import { Element, Space, SpaceElements, User } from "@prisma/client";
import { Omit, Pick } from "@prisma/client/runtime/library";

export const signupSchema = z.object({
  username: z.string(),
  password: z.string().min(6),
  confirmPassword: z.string().min(6),
});

export const signinSchema = z.object({
  username: z.string(),
  password: z.string().min(6),
});

export type currentUserType = {
  id: string;
  username: string;
  avatarId?: string;
  role: roleType;
};

export const spaceJoinSchema = z.object({
  spaceId: z.string().min(6),
});

export const createSpaceSchema = z.object({
  name: z.string(),
  height: z.number().min(20, "To low!").max(100, "To high!"),
  width: z.number().min(20, "To low!").max(100, "To high!"),
  mapId: z.string().optional(),
});

type userInfoType = Omit<User, "password">;
type spaceElementInfoType = Pick<SpaceElements, "id" | "x" | "y">;

export type spaceInfoWithCreatorAndElements = Pick<
  Space,
  "name" | "thumbnail"
> & {
  creator: userInfoType;
  dimensions: string;
  elements: spaceElementInfoType &
    {
      element: Element;
    }[];
};

interface space {
  id: string;
  name: string;
  thumbnail: string;
}

export type getUserOwnSpaces = Pick<space, "id" | "name" | "thumbnail"> & {
  dimensions: string;
};

enum roleType {
  User,
  Admin,
}
