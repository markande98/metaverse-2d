import { Card, CardContent, CardFooter } from "@/components/ui/card";

interface AvatarCardProps {
  name: string;
  imageUrl: string;
}

export const AvatarCard = ({ name, imageUrl }: AvatarCardProps) => {
  return (
    <Card className="hover:shadow-lg transition-shadow duration-300 cursor-pointer">
      <CardContent className="p-0 flex items-center justify-center">
        <img src={imageUrl} alt="avatar" width={90} height={50} />
      </CardContent>
      <CardFooter className="p-2 flex-col space-y-2">
        <p className="font-sm w-full text-muted-foreground text-xs text-start">
          Name : {name}
        </p>
      </CardFooter>
    </Card>
  );
};
