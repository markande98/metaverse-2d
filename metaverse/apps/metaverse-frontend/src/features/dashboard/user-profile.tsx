import { useAuth } from "../auth/auth-provider";

export const UserProfile = () => {
  const { currentUser } = useAuth();

  return (
    <div>
      <p>{currentUser?.id}</p>
      <p>{currentUser?.username}</p>
      <p>{currentUser?.avatarId}</p>
      <p>{currentUser?.role}</p>
    </div>
  );
};
