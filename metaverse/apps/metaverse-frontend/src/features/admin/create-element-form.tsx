import { useForm } from "react-hook-form";
import { z } from "zod";
import { createElementSchema } from "../types";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { customAxios } from "@/lib/api";
import { useCreateElementModal } from "./hooks/use-create-element";
import { toast } from "sonner";
import { useQueryClient } from "@tanstack/react-query";

export const CreateSpaceForm = () => {
  const queryClient = useQueryClient();
  const [isLoading, setIsLoading] = useState(false);
  const { onClose } = useCreateElementModal();
  const form = useForm<z.infer<typeof createElementSchema>>({
    resolver: zodResolver(createElementSchema),
    defaultValues: {
      width: 0,
      height: 0,
      imageUrl: "",
      static: true,
    },
  });

  const onSubmit = async (values: z.infer<typeof createElementSchema>) => {
    try {
      setIsLoading(true);
      await customAxios.post("/admin/element", values);
      onClose();
      toast("Element created");
      await queryClient.refetchQueries({ queryKey: ["admin-element"] });
    } catch (e) {
      console.log(e);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Add Element</h2>
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
            <div className="flex items-center justify-between">
              <FormField
                control={form.control}
                name="width"
                render={({ field }) => (
                  <FormItem className="space-y-2">
                    <FormLabel>Width</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="enter value"
                        disabled={isLoading}
                        onChange={(e) => field.onChange(Number(e.target.value))}
                        type="number"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="height"
                render={({ field }) => (
                  <FormItem className="space-y-2">
                    <FormLabel>Height</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        disabled={isLoading}
                        placeholder="enter value"
                        onChange={(e) => field.onChange(Number(e.target.value))}
                        type="number"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <Button type="submit" className="w-full" variant="blue">
              create
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};
