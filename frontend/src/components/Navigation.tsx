import logo from "figma:asset/4ca9b3623e2c0ac1d98ff64875d9b426ddff926e.png";

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
            <img src={logo} alt="Logo" className="w-7 h-7 object-contain filter brightness-0" />
          </div>
          <h1 className="font-['Arimo',sans-serif] text-white text-lg tracking-wider">Stalk Master</h1>
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

        {/* User Avatar */}
        <div className="bg-[#00d9a3] rounded-lg size-9 flex items-center justify-center">
          <span className="font-['Arimo',sans-serif] text-[#1e3338] text-sm">A</span>
        </div>
      </div>
    </div>
  );
}