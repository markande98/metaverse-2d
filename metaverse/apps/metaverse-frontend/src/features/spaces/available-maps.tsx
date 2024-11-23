import { useGetMaps } from "./hooks/use-get-maps";
import { MapCard } from "./map-card";

interface AvailableMapsProps {
  setMapId: React.Dispatch<React.SetStateAction<string>>;
  mapId: string;
}

export const AvailableMaps = ({ mapId, setMapId }: AvailableMapsProps) => {
  const maps = useGetMaps();

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {maps.map((map) => (
        <MapCard
          key={map.id}
          activeMapId={mapId}
          id={map.id}
          name={map.name}
          width={map.width}
          height={map.height}
          thumbnail={map.thumbnail}
          setMapId={setMapId}
        />
      ))}
    </div>
  );
};
