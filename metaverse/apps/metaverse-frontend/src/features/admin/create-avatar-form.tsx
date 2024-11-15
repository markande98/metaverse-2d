import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { customAxios } from "@/lib/api";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { createAvatarSchema } from "../types";
import { useCreateAvatarModal } from "./hooks/use-create-avatar";
import { useQueryClient } from "@tanstack/react-query";

export const CreateAvatarForm = () => {
  const queryClient = useQueryClient();
  const [isLoading, setIsLoading] = useState(false);
  const { onClose } = useCreateAvatarModal();
  const form = useForm<z.infer<typeof createAvatarSchema>>({
    resolver: zodResolver(createAvatarSchema),
    defaultValues: {
      imageUrl: "",
      name: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof createAvatarSchema>) => {
    try {
      setIsLoading(true);
      await customAxios.post("/admin/avatar", values);
      onClose();
      toast("Avatar created");
      await queryClient.refetchQueries({ queryKey: ["admin-avatars"] });
    } catch (e) {
      console.log(e);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Add Avatar</h2>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem className="space-y-2">
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="enter name"
                      disabled={isLoading}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="imageUrl"
              render={({ field }) => (
                <FormItem className="space-y-2">
                  <FormLabel>ImageUrl</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      disabled={isLoading}
                      placeholder="enter image url"
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full" variant="blue">
              create
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};
