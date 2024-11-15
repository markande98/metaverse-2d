import { AvatarCard } from "./avatar-card";
import { useGetAdminAvatars } from "./hooks/use-get-admin-avatars";

export const AdminAvatars = () => {
  const avatars = useGetAdminAvatars();

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 pt-10">
        {avatars?.map((avatar) => (
          <AvatarCard
            key={avatar.id}
            name={avatar.name!}
            imageUrl={avatar.imageUrl!}
          />
        ))}
      </div>
    </>
  );
};
