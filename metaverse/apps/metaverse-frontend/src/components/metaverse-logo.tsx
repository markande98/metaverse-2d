import { cn } from "@/lib/utils";
import { Boxes } from "lucide-react";

type MetaVerseLogoProps = {
  isHeader?: boolean;
};

export const MetaVerseLogo = ({ isHeader }: MetaVerseLogoProps) => {
  return (
    <div
      className={cn(
        "flex items-center gap-3 mb-8 justify-center",
        isHeader && "mb-0"
      )}
    >
      <Boxes
        className={cn(
          " text-indigo-600",
          isHeader ? "h-10 w-10 text-white" : "h-20 : w-20"
        )}
      />
      <h1
        className={cn(
          "font-bold text-gray-900",
          isHeader ? "text-2xl text-white" : "text-6xl"
        )}
      >
        MetaVerse
      </h1>
    </div>
  );
};
