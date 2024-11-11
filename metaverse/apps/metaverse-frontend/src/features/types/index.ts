import z from "zod";

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

enum roleType {
  User,
  Admin,
}
