import { Avatar } from "./avatar";
import { Element } from "./element";
import { Map } from "./map";

interface MainContentProps {
  activeItem: string;
}

export const MainContent = ({ activeItem }: MainContentProps) => {
  const getContent = (itemId: string) => {
    switch (itemId) {
      case "element":
        return <Element />;
      case "avatar":
        return <Avatar />;
      case "map":
        return <Map />;
    }
  };
  return getContent(activeItem);
};
