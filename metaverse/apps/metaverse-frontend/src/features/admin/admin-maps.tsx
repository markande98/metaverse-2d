import Modal from "@/components/modal";
import { useGetadminMaps } from "./hooks/use-get-admin-maps";
import { MapCard } from "./map-card";
import { MapView } from "./admin-map-view";
import { useMapViewModal } from "./hooks/use-map-view";

export const AdminMaps = () => {
  const maps = useGetadminMaps();
  const { isOpen, onClose } = useMapViewModal();
  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <MapView />
      </Modal>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 pt-10">
        {maps.map((map) => (
          <MapCard
            key={map.id}
            name={map.name}
            width={map.width}
            height={map.height}
            thumbnail={map.thumbnail}
            mapElements={map.mapElements}
          />
        ))}
      </div>
    </>
  );
};
