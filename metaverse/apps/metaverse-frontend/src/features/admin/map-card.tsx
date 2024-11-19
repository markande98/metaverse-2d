import { Card, CardContent, CardFooter } from "@/components/ui/card";

interface MapCardProps {
  name: string;
  thumbnail: string;
  width: number;
  height: number;
}

export const MapCard = ({ name, thumbnail, width, height }: MapCardProps) => {
  return (
    <Card className="hover:shadow-lg transition-shadow duration-300 cursor-pointer">
      <CardContent className="flex p-4 items-center justify-center">
        <img src={thumbnail} alt="avatar" width={250} height={50} />
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
