import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface MapCardProps {
  name: string;
  thumbnail: string;
  width: number;
  height: number;
  activeMapId: string;
  id: string;
  setMapId: React.Dispatch<React.SetStateAction<string>>;
}

export const MapCard = ({
  name,
  thumbnail,
  width,
  height,
  activeMapId,
  id,
  setMapId,
}: MapCardProps) => {
  return (
    <Card
      onClick={() => setMapId(id)}
      className={cn(
        "hover:shadow-lg transition-shadow duration-300 cursor-pointer",
        id === activeMapId && "border-gray-400 border-4",
      )}
    >
      <CardContent className="flex p-0 items-center justify-center">
        <img src={thumbnail} alt="avatar" className="w-full rounded-lg" />
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
