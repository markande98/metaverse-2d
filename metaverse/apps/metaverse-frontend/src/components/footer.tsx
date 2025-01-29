import { Boxes } from "lucide-react";

export const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 text-white p-6">
      <div className="max-w-7xl mx-auto space-y-4">
        <div className="flex items-center justify-center gap-x-4">
          <Boxes className="h-10 w-10" />
          <p className="text-center text-2xl text-gray-400">MetaVerse</p>
        </div>
        <p className="text-center text-gray-400">
          © 2025 Metaverse. All rights reserved.
        </p>
      </div>
    </footer>
  );
};
