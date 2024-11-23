import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { updateAvatarSchema } from "@/features/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useGetAvatar } from "../hooks/use-get-avatars";
import { useCallback, useState } from "react";
import { useAvatarModal } from "../hooks/use-avatar-update";
import { customAxios } from "@/lib/api";
import { toast } from "sonner";
import { useQueryClient } from "@tanstack/react-query";

export const AvatarUpdateForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { onClose } = useAvatarModal();
  const queryClient = useQueryClient();
  const avatars = useGetAvatar();
  const form = useForm<z.infer<typeof updateAvatarSchema>>({
    resolver: zodResolver(updateAvatarSchema),
    defaultValues: {
      avatarId: "",
    },
  });

  const onSubmit = useCallback(
    async (values: z.infer<typeof updateAvatarSchema>) => {
      try {
        setIsLoading(true);
        await customAxios.post("/user/metadata", values);
        onClose();
        toast("avatar updated!");
        await queryClient.refetchQueries({ queryKey: ["current-user"] });
      } catch (e) {
        console.log(e);
      } finally {
        setIsLoading(false);
      }
    },
    [onClose, queryClient]
  );
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <h2 className="font-bold">Update Avatar</h2>
        <div className="space-y-4">
          <FormField
            control={form.control}
            name="avatarId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Select Avatar</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger disabled={isLoading}>
                      <SelectValue placeholder="select a avatar for your profile" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {avatars.map((avatar) => (
                      <SelectItem key={avatar.id} value={avatar.id!}>
                        <div className="flex items-center space-x-5">
                          <img
                            className="h-8 w-8 rounded-full"
                            src={avatar.imageUrl!}
                            alt="avatar"
                          />
                          <p>{avatar.name}</p>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormItem>
            )}
          />
          <Button
            disabled={isLoading}
            type="submit"
            variant="blue"
            className="w-full"
          >
            update
          </Button>
        </div>
      </form>
    </Form>
  );
};
