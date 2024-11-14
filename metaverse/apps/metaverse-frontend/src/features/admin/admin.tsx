import { useNavigate } from "react-router-dom";
import { useCurrentUser } from "../auth/hooks/use-current-user";
import { Sidebar } from "./components/sidebar";
import { useState } from "react";
import { MainContent } from "./components/main-content";

export const Admin = () => {
  const [activeItem, setActiveItem] = useState("element");
  const navigate = useNavigate();
  const user = useCurrentUser();

  if (user?.role === "User") {
    navigate("/");
  }
  if (user === null) return null;

  const menuItems = [
    { id: "element", label: "Element" },
    {
      id: "avatar",
      label: "Avatar",
    },
    {
      id: "map",
      label: "Map",
    },
  ];
  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar
        items={menuItems}
        activeItem={activeItem}
        setActiveItem={setActiveItem}
      />
      <div className="flex-1 p-8 overflow-auto">
        <MainContent activeItem={activeItem} />
      </div>
    </div>
  );
};
