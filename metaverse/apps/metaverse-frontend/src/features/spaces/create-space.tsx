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
import { useCallback, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { z } from "zod";
import { createSpaceSchema } from "../types";
import { useCreateSpaceModal } from "./hooks/use-create-space-modal";
import { Separator } from "@/components/ui/separator";
import { AvailableMaps } from "./available-maps";

export const CreateSpace = () => {
  const [mapId, setMapId] = useState("");
  const [isLoading, setIsloading] = useState(false);
  const { onClose } = useCreateSpaceModal();
  const navigate = useNavigate();
  const form = useForm<z.infer<typeof createSpaceSchema>>({
    resolver: zodResolver(createSpaceSchema),
    defaultValues: {
      name: "",
      width: 20,
      height: 20,
      mapId,
    },
  });
  const onSubmit = useCallback(
    async (values: z.infer<typeof createSpaceSchema>) => {
      try {
        setIsloading(true);
        const { name, width, height } = values;
        const dimensions = `${width.toString()}x${height.toString()}`;
        const res = await customAxios.post("/space", {
          name,
          dimensions,
          mapId,
        });
        const spaceId = res.data.spaceId;
        form.reset();
        onClose();
        navigate(`/space/${spaceId}`);
      } catch (e) {
        console.log(e);
      } finally {
        setIsloading(false);
      }
    },
    [form, onClose, navigate, mapId]
  );

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Create Space</h2>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem className="space-y-2">
                  <FormLabel>Space name</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="spacename..."
                      disabled={isLoading}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <div className="w-full flex items-center justify-between">
              <FormField
                control={form.control}
                name="width"
                render={({ field }) => (
                  <FormItem className="space-y-2">
                    <FormLabel>Width</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="upto 100"
                        type="number"
                        onChange={(e) => field.onChange(Number(e.target.value))}
                        disabled={isLoading}
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
                        placeholder="upto 100"
                        type="number"
                        onChange={(e) => field.onChange(Number(e.target.value))}
                        disabled={isLoading}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="w-full relative flex items-center justify-center">
              <Separator className="z-10" />
              <span className="absolute text-xl z-50 bg-white w-8 text-center">
                Or
              </span>
            </div>
            <h2 className="text-xl font-semibold">Choose Map</h2>
            <AvailableMaps mapId={mapId} setMapId={setMapId} />
            <Button variant="blue" className="w-full" type="submit">
              create
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};
