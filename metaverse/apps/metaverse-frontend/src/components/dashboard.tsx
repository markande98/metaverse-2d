import { Spaces } from "@/features/spaces/spaces";
import { CardWrapper } from "./card-wrapper";
import { Header } from "./header";

export const Dashboard = () => {
  return (
    <CardWrapper>
      <Header />
      <Spaces />
    </CardWrapper>
  );
};
