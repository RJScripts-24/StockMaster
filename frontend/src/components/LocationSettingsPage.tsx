import { useState, useEffect } from "react";
import { Edit2, Trash2, AlertCircle } from "lucide-react";
import svgPaths from "../imports/svg-0xl03li6bh";
import { Navigation } from "./Navigation";
import { warehousesService } from "../services/api/warehouses.service";
import type { Warehouse } from "../types";

interface LocationSettingsPageProps {
  onNavigate: (page: string) => void;
}

export function LocationSettingsPage({ onNavigate }: LocationSettingsPageProps) {
  const [warehouses, setWarehouses] = useState<Warehouse[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchWarehouses();
  }, []);

  const fetchWarehouses = async () => {
    try {
      setLoading(true);
      const response = await warehousesService.getAll();
      setWarehouses(response.data || []);
    } catch (err) {
      console.error('Failed to fetch warehouses:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-[#2c4b52] min-h-screen flex flex-col">
      <Navigation activeMenu="settings" onNavigate={onNavigate} />

      <div className="flex-1 px-6 py-8 max-w-4xl">
        {/* Info Notice */}
        <div className="bg-[#1e3338] border-2 border-[#00d9a3] rounded-2xl p-6 mb-6">
          <div className="flex items-start gap-4">
            <AlertCircle className="w-6 h-6 text-[#00d9a3] flex-shrink-0 mt-1" />
            <div>
              <h3 className="font-['Arimo',sans-serif] text-[#00d9a3] text-lg mb-2">Location Management</h3>
              <p className="font-['Arimo',sans-serif] text-[#b4cdd4] mb-4">
                The location management feature is currently being developed. For now, you can manage your warehouses
                from the main warehouse page or settings.
              </p>
              <p className="font-['Arimo',sans-serif] text-[#8ba6ac] text-sm">
                Locations will allow you to organize storage areas within warehouses (e.g., aisles, shelves, bins).
                This feature will be available in a future update.
              </p>
            </div>
          </div>
        </div>

        {/* Current Warehouses */}
        <div className="bg-[#1e3338] border border-[#3a5a62] rounded-2xl p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-['Arimo',sans-serif] text-[#00d9a3]">Your Warehouses</h3>
            <span className="font-['Arimo',sans-serif] text-[#8ba6ac]">
              {warehouses.length} {warehouses.length === 1 ? 'warehouse' : 'warehouses'}
            </span>
          </div>

          {loading ? (
            <div className="text-center py-8">
              <p className="font-['Arimo',sans-serif] text-[#8ba6ac]">Loading warehouses...</p>
            </div>
          ) : warehouses.length === 0 ? (
            <div className="text-center py-8">
              <p className="font-['Arimo',sans-serif] text-[#8ba6ac] mb-4">
                No warehouses found. Add a warehouse to get started.
              </p>
              <button
                onClick={() => onNavigate('warehouse')}
                className="px-4 py-2 bg-[#00d9a3] text-[#1e3338] rounded-lg hover:opacity-80 font-['Arimo',sans-serif]"
              >
                Go to Warehouse Page
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {warehouses.map((warehouse) => (
                <div key={warehouse.id} className="bg-[#2c4b52] border border-[#3a5a62] rounded-lg p-4">
                  <div className="flex items-start justify-between">
                    <div className="space-y-2">
                      <h4 className="font-['Arimo',sans-serif] text-white text-lg">{warehouse.name}</h4>
                      <div className="flex gap-4">
                        <span className="font-['Arimo',sans-serif] text-[#8ba6ac] text-sm">
                          Code: <span className="text-[#00d9a3]">{warehouse.code}</span>
                        </span>
                        {warehouse.location && (
                          <span className="font-['Arimo',sans-serif] text-[#8ba6ac] text-sm">
                            Location: <span className="text-white">{warehouse.location}</span>
                          </span>
                        )}
                      </div>
                    </div>
                    <button
                      onClick={() => onNavigate('settings-warehouse')}
                      className="px-3 py-1 bg-[#00d9a3] text-[#1e3338] rounded hover:opacity-80 font-['Arimo',sans-serif] text-sm"
                    >
                      Edit
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-2 gap-4 mt-6">
          <button
            onClick={() => onNavigate('warehouse')}
            className="bg-[#1e3338] border border-[#3a5a62] rounded-xl p-4 hover:border-[#00d9a3] transition-colors text-left"
          >
            <p className="font-['Arimo',sans-serif] text-[#00d9a3] mb-1">Manage Warehouses</p>
            <p className="font-['Arimo',sans-serif] text-[#8ba6ac] text-sm">Add or edit warehouse details</p>
          </button>
          <button
            onClick={() => onNavigate('settings-warehouse')}
            className="bg-[#1e3338] border border-[#3a5a62] rounded-xl p-4 hover:border-[#00d9a3] transition-colors text-left"
          >
            <p className="font-['Arimo',sans-serif] text-[#00d9a3] mb-1">Warehouse Settings</p>
            <p className="font-['Arimo',sans-serif] text-[#8ba6ac] text-sm">Configure warehouse properties</p>
          </button>
        </div>
      </div>
    </div>
  );
}
