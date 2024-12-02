import { mapWithElements } from "@/features/types";
import { create } from "zustand";

interface ModalData {
  name: string;
  width: number;
  height: number;
  mapElements: mapWithElements[];
}

interface MapViewModalProps {
  isOpen: boolean;
  data: ModalData | null;
  onOpen: (
    mapElements: mapWithElements[],
    name: string,
    width: number,
    height: number,
  ) => void;
  onClose: () => void;
}

export const useMapViewModal = create<MapViewModalProps>((set) => ({
  isOpen: false,
  data: null,
  onClose: () => set({ isOpen: false, data: null }),
  onOpen: (
    mapElements: mapWithElements[],
    name: string,
    width: number,
    height: number,
  ) => set({ isOpen: true, data: { mapElements, name, width, height } }),
}));
