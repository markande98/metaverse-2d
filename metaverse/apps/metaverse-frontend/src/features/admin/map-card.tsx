import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { useMapViewModal } from "./hooks/use-map-view";
import { mapWithElements } from "../types";

interface MapCardProps {
  name: string;
  thumbnail: string;
  width: number;
  height: number;
  mapElements: mapWithElements[];
}

export const MapCard = ({
  name,
  thumbnail,
  width,
  height,
  mapElements,
}: MapCardProps) => {
  const { onOpen } = useMapViewModal();

  return (
    <Card
      onClick={() => onOpen(mapElements, name, width, height)}
      className="hover:shadow-lg transition-shadow duration-300 cursor-pointer"
    >
      <CardContent className="flex p-0 items-center justify-center">
        <img src={thumbnail} alt="avatar" className="w-full" />
      </CardContent>
      <CardFooter className="p-2 flex-col space-y-2">
        <p className="font-sm w-full text-muted-foreground text-xs text-start">
          Name : {name}
        </p>
        <p className="font-sm w-full text-muted-foreground text-xs text-start">
          Dimensions : {`${width}x${height}`}
        </p>
      </CardFooter>
    </Card>
  );
};
