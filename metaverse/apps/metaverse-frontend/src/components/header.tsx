import { UserProfile } from "@/features/auth/user-profile";
import { useScrollTop } from "@/hooks/use-scroll";
import { cn } from "@/lib/utils";

export const Header = () => {
  const scrolled = useScrollTop();
  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 bg-white z-50",
        scrolled && "border-b shadow-md"
      )}
    >
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <img
                src="/images/zep.png"
                alt="Logo"
                className="h-10 w-10 rounded"
              />
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <UserProfile />
          </div>
        </div>
      </div>
    </header>
  );
};
