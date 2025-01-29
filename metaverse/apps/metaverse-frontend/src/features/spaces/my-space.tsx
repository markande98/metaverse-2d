import { useGetAllSpace } from "./hooks/use-get-all-space";
import { SpaceCard } from "./space-card";

export const MySpace = () => {
  const { spaces, isError } = useGetAllSpace();

  if (isError) return <div>An error occured!</div>;
  if (spaces?.length === 0)
    return (
      <div className="h-[calc(100vh-200px)] flex items-center justify-center">
        <p className="font-sm text-2xl text-center text-muted-foreground">
          No spaces created!, try creating one😀
        </p>
      </div>
    );

  return (
    <div className="max-w-7xl mx-auto pt-10">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {spaces?.map((space) => (
          <SpaceCard
            key={space.id}
            spaceId={space.id}
            name={space.name}
            dimensions={space.dimensions}
            thumbnail={space.thumbnail}
          />
        ))}
      </div>
    </div>
  );
};
