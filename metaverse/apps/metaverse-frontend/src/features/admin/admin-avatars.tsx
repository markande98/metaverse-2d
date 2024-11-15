import { AvatarCard } from "./avatar-card";
import { useGetAdminAvatars } from "./hooks/use-get-admin-avatars";

export const AdminAvatars = () => {
  const avatars = useGetAdminAvatars();

  return (
    <>
      <div className="pt-20 flex items-center flex-wrap justify-between">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {avatars?.map((avatar) => (
            <AvatarCard
              key={avatar.id}
              name={avatar.name!}
              imageUrl={avatar.imageUrl!}
            />
          ))}
        </div>
      </div>
    </>
  );
};
