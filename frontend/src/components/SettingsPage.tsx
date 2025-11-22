import { Warehouse, MapPin } from "lucide-react";
import { Navigation } from "./Navigation";

interface SettingsPageProps {
  onNavigate: (page: string) => void;
}

export function SettingsPage({ onNavigate }: SettingsPageProps) {
  return (
    <div className="min-h-screen bg-[#2c4b52] flex flex-col">
      <Navigation activeMenu="settings" onNavigate={onNavigate} />

      <div className="flex-1 px-6 py-8">
        {/* Header */}
        <div className="mb-8">
          <h2 className="font-['Arimo',sans-serif] text-white mb-2">Settings</h2>
          <p className="font-['Arimo',sans-serif] text-[#8ba6ac]">Select a settings category to configure</p>
        </div>

        {/* Settings Options */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl">
          {/* Warehouse Settings */}
          <button
            onClick={() => onNavigate("settings-warehouse")}
            className="bg-[#1e3338] rounded-2xl border border-[#3a5a62] p-8 text-left hover:border-[#00d9a3] transition-all group"
          >
            <div className="flex items-center gap-4 mb-4">
              <div className="bg-[#2c4b52] rounded-lg size-12 flex items-center justify-center group-hover:bg-[#00d9a3]/10 transition-colors">
                <Warehouse className="w-6 h-6 text-[#00d9a3]" />
              </div>
              <h3 className="font-['Arimo',sans-serif] text-white">Warehouse</h3>
            </div>
            <p className="font-['Arimo',sans-serif] text-[#8ba6ac] text-sm">
              Manage warehouse details, capacity, and statistics
            </p>
          </button>

          {/* Location Settings */}
          <button
            onClick={() => onNavigate("settings-location")}
            className="bg-[#1e3338] rounded-2xl border border-[#3a5a62] p-8 text-left hover:border-[#00d9a3] transition-all group"
          >
            <div className="flex items-center gap-4 mb-4">
              <div className="bg-[#2c4b52] rounded-lg size-12 flex items-center justify-center group-hover:bg-[#00d9a3]/10 transition-colors">
                <MapPin className="w-6 h-6 text-[#00d9a3]" />
              </div>
              <h3 className="font-['Arimo',sans-serif] text-white">Location</h3>
            </div>
            <p className="font-['Arimo',sans-serif] text-[#8ba6ac] text-sm">
              Configure storage locations and organize your warehouse layout
            </p>
          </button>
        </div>
      </div>
    </div>
  );
}
