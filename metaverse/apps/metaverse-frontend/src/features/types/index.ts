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

enum roleType {
  User,
  Admin,
}