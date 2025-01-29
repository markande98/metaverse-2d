import { UserProfile } from "@/features/auth/components/user-profile";
import { useScrollTop } from "@/hooks/use-scroll";
import { cn } from "@/lib/utils";
import { MetaVerseLogo } from "./metaverse-logo";

export const Header = () => {
  const scrolled = useScrollTop();
  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 bg-white z-40 bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 transition duration-150",
        scrolled && "border-b shadow-md opacity-70"
      )}
    >
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-10">
            <MetaVerseLogo isHeader />
          </div>
          <div className="flex items-center space-x-4">
            <UserProfile />
          </div>
        </div>
      </div>
    </header>
  );
};
