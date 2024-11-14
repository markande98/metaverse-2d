import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { useUpdateElementModal } from "./hooks/use-update-element";

interface ElementCardProps {
  id: string;
  width: number;
  height: number;
  isStatic: boolean;
  imageUrl: string;
}

export const ElementCard = ({
  id,
  width,
  height,
  isStatic,
  imageUrl,
}: ElementCardProps) => {
  const { onOpen } = useUpdateElementModal();
  const onClick = (id: string, imageUrl: string) => {
    onOpen(id, imageUrl);
  };
  return (
    <Card
      onClick={() => onClick(id, imageUrl)}
      className="hover:shadow-lg transition-shadow duration-300 cursor-pointer"
    >
      <CardContent className="px-0 flex items-center">
        {imageUrl ? (
          <img
            src={imageUrl}
            alt="element"
            width={width * 100}
            height={height * 100}
          />
        ) : (
          <img
            src="/images/space.png"
            alt="thumbnail"
            width={1}
            height={1}
            className="object-cover rounded-md"
          />
        )}
      </CardContent>
      <CardFooter className="p-2 flex-col space-y-2">
        <p className="font-sm w-full text-muted-foreground text-xs text-start">
          dimensions : {`${width} X ${height}`}
        </p>
        <p className="font-sm w-full text-muted-foreground text-xs text-start">
          Static : {isStatic ? "true" : "false"}
        </p>
      </CardFooter>
    </Card>
  );
};
