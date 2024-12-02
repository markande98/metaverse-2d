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
import { Label } from "@/components/ui/label";
import { customAxios } from "@/lib/api";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCallback, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { createMapSchema } from "../types";
import { useCreateMapModal } from "./hooks/use-create-map";
import { toast } from "sonner";
import { useQueryClient } from "@tanstack/react-query";

export const CreateMapForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [x, setX] = useState(0);
  const [y, setY] = useState(0);
  const { onClose } = useCreateMapModal();
  const queryClient = useQueryClient();
  const [elementId, setElementId] = useState("");
  const [countAdded, setCountAdded] = useState(0);

  const form = useForm<z.infer<typeof createMapSchema>>({
    resolver: zodResolver(createMapSchema),
    defaultValues: {
      name: "",
      dimensions: "",
      thumbnail: "",
      defaultElements: [],
    },
  });

  const onSubmit = useCallback(
    async (values: z.infer<typeof createMapSchema>) => {
      try {
        setIsLoading(true);
        await customAxios.post("/admin/map", values);
        onClose();
        toast("map created!");
        await queryClient.refetchQueries({ queryKey: ["admin-map"] });
      } catch (e) {
        console.log(e);
      } finally {
        setIsLoading(false);
      }
    },
    [onClose, queryClient],
  );

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Add Map</h2>
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
              name="thumbnail"
              render={({ field }) => (
                <FormItem className="space-y-2">
                  <FormLabel>Thumnbnail</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="thumbnail"
                      disabled={isLoading}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="dimensions"
              render={({ field }) => (
                <FormItem className="space-y-2">
                  <FormLabel>Dimensions</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="axb" disabled={isLoading} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="defaultElements"
              render={({ field }) => (
                <div className="space-y-4">
                  <p>Defaults Elements</p>
                  <div className="flex items-center justify-between gap-x-3">
                    <div className="space-y-2">
                      <Label>ElementID</Label>
                      <Input
                        type="text"
                        placeholder="id"
                        onChange={(e) => setElementId(e.target.value)}
                        disabled={isLoading}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>X</Label>
                      <Input
                        type="number"
                        placeholder="0"
                        onChange={(e) => setX(Number(e.target.value))}
                        disabled={isLoading}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Y</Label>
                      <Input
                        type="number"
                        placeholder="0"
                        onChange={(e) => setY(Number(e.target.value))}
                        disabled={isLoading}
                      />
                    </div>
                  </div>
                  <div
                    onClick={() => {
                      field.value.push({ elementId, x, y });
                      setCountAdded((count) => count + 1);
                    }}
                    className="w-full"
                  >
                    <span className="mr-10 bg-gray-100 p-2 rounded-md text-sm cursor-pointer">
                      Add
                    </span>
                    {countAdded ? (
                      <span className="text-sm text-muted-foreground">
                        {countAdded} added
                      </span>
                    ) : null}
                  </div>
                </div>
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
