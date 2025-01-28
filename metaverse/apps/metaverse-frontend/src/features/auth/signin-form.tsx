import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { signinSchema } from "@/features/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useAuth } from "./auth-provider";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { FormError } from "./components/form.error";

export const SigninForm = () => {
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { handleSignIn } = useAuth();
  const navigate = useNavigate();
  const form = useForm<z.infer<typeof signinSchema>>({
    resolver: zodResolver(signinSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof signinSchema>) => {
    setError("");
    try {
      setIsLoading(true);
      await handleSignIn(values);
      navigate("/");
      toast("Signed In!");
    } catch (e) {
      if (e instanceof Error) {
        setError(e.message);
      }
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="space-y-4">
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem className="space-y-2">
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="Enter your username"
                    disabled={isLoading}
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem className="space-y-2">
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="******"
                    type="password"
                    disabled={isLoading}
                  />
                </FormControl>
              </FormItem>
            )}
          />
        </div>
        <FormError message={error} />
        <Button
          variant="blue"
          type="submit"
          className="w-full"
          disabled={isLoading}
        >
          sign in
        </Button>
      </form>
    </Form>
  );
};
