import { customAxios } from "@/lib/api";
import { AxiosResponse } from "axios";
import { createContext, PropsWithChildren, useContext } from "react";
import { z } from "zod";
import { signinSchema, signupSchema } from "../types";

type AuthContextType = {
  handleSignIn: (
    values: z.infer<typeof signinSchema>
  ) => Promise<AxiosResponse>;
  handleSignUp: (
    values: z.infer<typeof signupSchema>
  ) => Promise<AxiosResponse>;
  handleLogout: () => Promise<AxiosResponse>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

type AuthProviderProps = PropsWithChildren;

export default function AuthProvider({ children }: AuthProviderProps) {
  const handleSignUp = async (values: z.infer<typeof signupSchema>) => {
    const { username, password } = values;
    try {
      const res = await customAxios.post(`/signup`, {
        username,
        password,
        type: "user",
      });
      return res;
    } catch (e) {
      throw new Error(e.response.data.message);
    }
  };
  const handleSignIn = async (values: z.infer<typeof signinSchema>) => {
    try {
      const { username, password } = values;
      const res = await customAxios.post(`/signin`, {
        username,
        password,
      });
      return res;
    } catch (e) {
      throw new Error(e.response.data.message);
    }
  };

  const handleLogout = async () => {
    try {
      const res = await customAxios.post("/signout");
      return res;
    } catch (e) {
      console.log(e);
      throw e;
    }
  };

  return (
    <AuthContext.Provider
      value={{
        handleSignIn,
        handleSignUp,
        handleLogout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (context === undefined) {
    throw new Error("use auth must be used inside a provider");
  }

  return context;
};
