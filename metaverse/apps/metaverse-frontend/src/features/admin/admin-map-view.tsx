import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useMapViewModal } from "./hooks/use-map-view";
import { mapWithElements } from "../types";

export const MapView = () => {
  const { data } = useMapViewModal();

  if (data == null) return null;

  const renderGrid = () => {
    const grid = [];
    const elements: number[] = [];
    data.mapElements.forEach((me) => {
      elements.push(me.x! * data.width + me.y!);
    });

    for (let x = 0; x < data.width; x++) {
      const row = [];
      for (let y = 0; y < data.height; y++) {
        const cellClass = `w-5 h-5 border border-gray-200 flex items-center justify-center`;
        const isElement = elements.includes(x * data.width + y);
        const mapElement = data.mapElements.find(
          (me) => me.x === x && me.y === y
        ) as mapWithElements;
        row.push(
          <div key={`${x}-${y}`} className={cellClass}>
            {isElement && (
              <img
                src={mapElement.element.imageUrl}
                alt="element"
                className="w-5 h-5"
              />
            )}
          </div>
        );
      }
      grid.push(
        <div key={x} className="flex">
          {row}
        </div>
      );
    }
    return grid;
  };

  return (
    <Card className="mt-5">
      <CardHeader className="flex items-center justify-center space-y-6">
        <CardTitle>{data.name}</CardTitle>
        <CardDescription>
          Dimesions {`${data.width}x${data.height}`}
        </CardDescription>
      </CardHeader>
      <CardContent className="flex items-center justify-center">
        <div>{renderGrid()}</div>
      </CardContent>
    </Card>
  );
};
