type menuItemType = {
  id: string;
  label: string;
};

interface SidebarProps {
  items: menuItemType[];
  activeItem: string;
  setActiveItem: React.Dispatch<React.SetStateAction<string>>;
}

export const Sidebar = ({ items, activeItem, setActiveItem }: SidebarProps) => {
  return (
    <div className="w-64 bg-white shadow-lg">
      <div className="p-4">
        <h1 className="text-xl font-bold mb-4">Admin Dashboard</h1>
        <nav className="space-y-2">
          {items.map((item) => {
            return (
              <button
                key={item.id}
                onClick={() => setActiveItem(item.id)}
                className={`flex items-center space-x-2 w-full p-2 rounded-lg transition-colors ${
                  activeItem === item.id
                    ? "bg-blue-500 text-white"
                    : "hover:bg-gray-100 text-gray-700"
                }`}
              >
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>
      </div>
    </div>
  );
};
