import { useForm } from "react-hook-form";
import { z } from "zod";
import { spaceJoinSchema } from "../types";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export const SpaceJoinForm = () => {
  const form = useForm<z.infer<typeof spaceJoinSchema>>({
    resolver: zodResolver(spaceJoinSchema),
    defaultValues: {
      spaceId: "",
    },
  });

  const onSubmit = (values: z.infer<typeof spaceJoinSchema>) => {
    console.log(values);
  };

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Enter with code</h2>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="space-y-4">
            <FormField
              control={form.control}
              name="spaceId"
              render={({ field }) => (
                <FormItem className="space-y-2">
                  <FormLabel>Entry code</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="The entry code is 6 or more digits."
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <Button variant="blue" className="w-full">
              Enter
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};
