import { useForm } from "react-hook-form";
import { z } from "zod";
import { updateElementSchema } from "../types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useUpdateElementModal } from "./hooks/use-update-element";
import { useState } from "react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { customAxios } from "@/lib/api";
import { toast } from "sonner";
import { useQueryClient } from "@tanstack/react-query";

export const UpdateElementForm = () => {
  const queryClient = useQueryClient();
  const [isLoading, setIsLoading] = useState(false);
  const { data, onClose } = useUpdateElementModal();
  const form = useForm<z.infer<typeof updateElementSchema>>({
    resolver: zodResolver(updateElementSchema),
    defaultValues: {
      imageUrl: data?.imageUrl,
    },
  });

  const onSubmit = async (values: z.infer<typeof updateElementSchema>) => {
    try {
      setIsLoading(true);
      await customAxios.put(`/admin/element/${data?.id}`, values);
      onClose();
      toast("imageUrl updated!");
      await queryClient.refetchQueries({ queryKey: ["admin-element"] });
    } catch (e) {
      console.log(e);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Upadate Element</h2>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="space-y-4">
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
            <Button variant="blue" disabled={isLoading} type="submit">
              update
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};
