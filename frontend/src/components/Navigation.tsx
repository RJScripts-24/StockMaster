import { Truck } from "lucide-react";

interface NavigationProps {
  activeMenu: string;
  onNavigate: (page: string) => void;
}

export function Navigation({ activeMenu, onNavigate }: NavigationProps) {
  const menuItems = [
    { id: "dashboard", label: "Dashboard" },
    { id: "operations", label: "Operations" },
    { id: "products", label: "Products" },
    { id: "warehouse", label: "Warehouse" },
    { id: "history", label: "Move History" },
    { id: "settings", label: "Settings" },
  ];

  return (
    <div className="bg-[#1e3338] border-b border-[#3a5a62] px-6 py-3">
      <div className="flex items-center justify-between">
        {/* Logo */}
        <button 
          onClick={() => onNavigate("dashboard")}
          className="flex items-center gap-3"
        >
          <div className="bg-[#00d9a3] rounded-lg size-11 flex items-center justify-center">
            <Truck className="w-6 h-6 text-[#1e3338]" strokeWidth={2.5} />
          </div>
          <h1 className="font-['Arimo',sans-serif] text-white text-lg tracking-wider">StockMaster</h1>
        </button>

        {/* Navigation Links */}
        <div className="flex items-center gap-8">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className={`font-['Arimo',sans-serif] text-sm pb-1 transition-colors relative ${
                activeMenu === item.id
                  ? "text-[#00d9a3]"
                  : "text-[#b4cdd4] hover:text-[#00d9a3]"
              }`}
            >
              {item.label}
              {activeMenu === item.id && (
                <div className="absolute -bottom-3 left-0 right-0 h-0.5 bg-[#00d9a3]" />
              )}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}