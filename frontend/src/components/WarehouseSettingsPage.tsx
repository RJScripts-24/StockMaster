import { useState, useEffect } from "react";
import imgImageWithFallback from "figma:asset/4ca9b3623e2c0ac1d98ff64875d9b426ddff926e.png";
import { Navigation } from "./Navigation";
import { warehousesService } from "../services/api/warehouses.service";
import type { Warehouse } from "../types";

interface WarehouseSettingsPageProps {
  onNavigate: (page: string) => void;
}

export function WarehouseSettingsPage({ onNavigate }: WarehouseSettingsPageProps) {
  const [warehouses, setWarehouses] = useState<Warehouse[]>([]);
  const [selectedWarehouse, setSelectedWarehouse] = useState<Warehouse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [warehouseData, setWarehouseData] = useState({
    name: "",
    code: "",
    location: ""
  });

  useEffect(() => {
    fetchWarehouses();
  }, []);

  const fetchWarehouses = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await warehousesService.getAll();
      setWarehouses(response.data || []);
      
      // Select the first warehouse by default
      if (response.data && response.data.length > 0) {
        const firstWarehouse = response.data[0];
        setSelectedWarehouse(firstWarehouse);
        setWarehouseData({
          name: firstWarehouse.name,
          code: firstWarehouse.code,
          location: firstWarehouse.location || ""
        });
      }
    } catch (err: any) {
      console.error('Failed to fetch warehouses:', err);
      setError(err.message || 'Failed to load warehouses');
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    if (!selectedWarehouse) return;
    
    try {
      setSaving(true);
      await warehousesService.update(selectedWarehouse.id, {
        name: warehouseData.name,
        code: warehouseData.code,
        address: warehouseData.location
      });
      
      // Refresh the warehouse list
      await fetchWarehouses();
      alert('Warehouse updated successfully!');
    } catch (err: any) {
      console.error('Failed to update warehouse:', err);
      alert(err.message || 'Failed to update warehouse');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="bg-[#2c4b52] min-h-screen flex flex-col">
      <Navigation activeMenu="settings" onNavigate={onNavigate} />

      <div className="flex-1 px-6 py-8">
        {/* Header */}
        <div className="mb-8">
          <h2 className="font-['Arimo',sans-serif] text-white mb-2">Settings</h2>
        </div>

        {/* Warehouse Form */}
        <div className="bg-[#1e3338] border border-[#3a5a62] rounded-2xl p-8 max-w-4xl mb-6">
          <div className="flex items-center justify-between mb-8">
            <h3 className="font-['Arimo',sans-serif] text-red-400">Warehouse</h3>
            {warehouses.length > 1 && (
              <select
                value={selectedWarehouse?.id || ''}
                onChange={(e) => {
                  const warehouse = warehouses.find(w => w.id === Number(e.target.value));
                  if (warehouse) {
                    setSelectedWarehouse(warehouse);
                    setWarehouseData({
                      name: warehouse.name,
                      code: warehouse.code,
                      location: warehouse.location || ""
                    });
                  }
                }}
                className="bg-[#2c4b52] border border-[#3a5a62] text-white px-4 py-2 rounded-lg font-['Arimo',sans-serif]"
              >
                {warehouses.map(wh => (
                  <option key={wh.id} value={wh.id}>{wh.name} ({wh.code})</option>
                ))}
              </select>
            )}
          </div>

          {loading ? (
            <div className="text-center py-8">
              <p className="font-['Arimo',sans-serif] text-[#8ba6ac]">Loading warehouse data...</p>
            </div>
          ) : error ? (
            <div className="text-center py-8">
              <p className="font-['Arimo',sans-serif] text-red-400 mb-4">{error}</p>
              <button
                onClick={fetchWarehouses}
                className="px-4 py-2 bg-[#00d9a3] text-[#1e3338] rounded-lg hover:opacity-80"
              >
                Retry
              </button>
            </div>
          ) : warehouses.length === 0 ? (
            <div className="text-center py-8">
              <p className="font-['Arimo',sans-serif] text-[#8ba6ac] mb-4">No warehouses found. Please add a warehouse first.</p>
              <button
                onClick={() => onNavigate('warehouse')}
                className="px-4 py-2 bg-[#00d9a3] text-[#1e3338] rounded-lg hover:opacity-80"
              >
                Go to Warehouse Page
              </button>
            </div>
          ) : (
            <div className="space-y-8">
              {/* Name */}
              <div className="space-y-3">
                <label className="font-['Arimo',sans-serif] text-red-400 block">Name:</label>
                <input
                  type="text"
                  value={warehouseData.name}
                  onChange={(e) => setWarehouseData({ ...warehouseData, name: e.target.value })}
                  className="w-full bg-transparent border-b-2 border-red-400 text-white px-1 py-2 font-['Arimo',sans-serif] focus:outline-none focus:border-[#00d9a3]"
                  placeholder="Enter warehouse name"
                />
              </div>

              {/* Short Code */}
              <div className="space-y-3">
                <label className="font-['Arimo',sans-serif] text-red-400 block">Short Code:</label>
                <input
                  type="text"
                  value={warehouseData.code}
                  onChange={(e) => setWarehouseData({ ...warehouseData, code: e.target.value })}
                  className="w-full bg-transparent border-b-2 border-red-400 text-white px-1 py-2 font-['Arimo',sans-serif] focus:outline-none focus:border-[#00d9a3]"
                  placeholder="Enter warehouse code"
                />
              </div>

              {/* Address */}
              <div className="space-y-3">
                <label className="font-['Arimo',sans-serif] text-red-400 block">Address:</label>
                <textarea
                  value={warehouseData.location}
                  onChange={(e) => setWarehouseData({ ...warehouseData, location: e.target.value })}
                  className="w-full bg-transparent border-b-2 border-red-400 text-white px-1 py-2 font-['Arimo',sans-serif] focus:outline-none focus:border-[#00d9a3] h-24 resize-none"
                  placeholder="Enter warehouse address"
                />
              </div>

              {/* Save Button */}
              <div className="pt-4">
                <button
                  onClick={handleSave}
                  disabled={saving}
                  className="bg-[#00d9a3] hover:bg-[#00c794] text-[#1e3338] px-6 py-2 rounded-lg font-['Arimo',sans-serif] disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {saving ? 'Saving...' : 'Save Changes'}
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Statistics and Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl">
          {/* Warehouse Statistics */}
          <div className="bg-[#1e3338] border border-[#3a5a62] rounded-2xl p-6">
            <h4 className="font-['Arimo',sans-serif] text-[#00d9a3] mb-4">Warehouse Statistics</h4>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="font-['Arimo',sans-serif] text-[#8ba6ac]">Total Warehouses:</span>
                <span className="font-['Arimo',sans-serif] text-white">{warehouses.length}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-['Arimo',sans-serif] text-[#8ba6ac]">Selected Warehouse:</span>
                <span className="font-['Arimo',sans-serif] text-white">{selectedWarehouse?.code || 'N/A'}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-['Arimo',sans-serif] text-[#8ba6ac]">Last Updated:</span>
                <span className="font-['Arimo',sans-serif] text-white">
                  {selectedWarehouse ? new Date(selectedWarehouse.updatedAt).toLocaleDateString() : 'N/A'}
                </span>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-[#1e3338] border border-[#3a5a62] rounded-2xl p-6">
            <h4 className="font-['Arimo',sans-serif] text-[#00d9a3] mb-4">Quick Actions</h4>
            <div className="space-y-3">
              <button 
                onClick={() => onNavigate("settings-location")}
                className="w-full text-left font-['Arimo',sans-serif] text-[#b4cdd4] hover:text-[#00d9a3] transition-colors border-b border-[#3a5a62] pb-2"
              >
                Manage Locations →
              </button>
              <button 
                onClick={() => onNavigate("stock")}
                className="w-full text-left font-['Arimo',sans-serif] text-[#b4cdd4] hover:text-[#00d9a3] transition-colors border-b border-[#3a5a62] pb-2"
              >
                View Stock →
              </button>
              <button 
                onClick={() => onNavigate("history")}
                className="w-full text-left font-['Arimo',sans-serif] text-[#b4cdd4] hover:text-[#00d9a3] transition-colors"
              >
                View Move History →
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
