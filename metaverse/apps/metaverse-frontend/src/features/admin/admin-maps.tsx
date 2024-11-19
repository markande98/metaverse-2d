import { useGetadminMaps } from "./hooks/use-get-admin-maps";
import { MapCard } from "./map-card";

export const AdminMaps = () => {
  const maps = useGetadminMaps();

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 pt-10">
      {maps.map((map) => (
        <MapCard
          key={map.id}
          name={map.name}
          width={map.width}
          height={map.height}
          thumbnail={map.thumbnail}
        />
      ))}
    </div>
  );
};
