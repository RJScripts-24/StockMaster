import { useState, useEffect } from "react";
import { MapPin } from "lucide-react";
import { Navigation } from "./Navigation";
import { NewWarehouseModal } from "./modals/NewWarehouseModal";
import { warehousesService } from "../services/api/warehouses.service";
import type { Warehouse } from "../types";

interface WarehousePageProps {
  onNavigate: (page: string) => void;
}

export function WarehousePage({ onNavigate }: WarehousePageProps) {
  const [showNewWarehouseModal, setShowNewWarehouseModal] = useState(false);
  const [warehouses, setWarehouses] = useState<Warehouse[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch warehouses on component mount
  useEffect(() => {
    fetchWarehouses();
  }, []);

  const fetchWarehouses = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await warehousesService.getAll();
      setWarehouses(response.data || []);
    } catch (err: any) {
      console.error('Failed to fetch warehouses:', err);
      setError(err.message || 'Failed to load warehouses');
    } finally {
      setLoading(false);
    }
  };

  const handleSaveWarehouse = async (data: any) => {
    try {
      const newWarehouse = await warehousesService.create({
        name: data.name,
        code: data.shortCode,
        location: data.address,
        description: data.description || undefined,
      });
      
      // Add the new warehouse to the list
      setWarehouses([...warehouses, newWarehouse]);
      setShowNewWarehouseModal(false);
    } catch (err: any) {
      console.error('Failed to create warehouse:', err);
      alert(err.message || 'Failed to create warehouse');
    }
  };

  return (
    <div className="min-h-screen bg-[#2c4b52] flex flex-col">
      <Navigation activeMenu="warehouse" onNavigate={onNavigate} />

      <div className="flex-1 px-6 py-8">
        {/* Header */}
        <div className="mb-8">
          <h2 className="font-['Arimo',sans-serif] text-white text-3xl mb-2">Warehouse</h2>
          <p className="font-['Arimo',sans-serif] text-[#8ba6ac] text-base">Manage warehouse details and locations</p>
        </div>

        {/* Add New Warehouse Section */}
        <div className="bg-[#1e3338] rounded-2xl border border-[#3a5a62] p-8 mb-8">
          <button
            onClick={() => setShowNewWarehouseModal(true)}
            className="flex items-center gap-3 hover:opacity-80 transition-opacity"
          >
            <div className="bg-[#2c4b52] rounded-lg size-10 flex items-center justify-center">
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24">
                <path d="M5 12H19" stroke="#00D9A3" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M12 5V19" stroke="#00D9A3" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <h3 className="font-['Arimo',sans-serif] text-white text-xl">Add New Warehouse</h3>
          </button>
        </div>

        {/* Warehouse Locations */}
        <div className="bg-[#1e3338] rounded-2xl border border-[#3a5a62] p-8 mb-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="bg-[#2c4b52] rounded-lg size-10 flex items-center justify-center">
              <MapPin className="w-6 h-6 text-[#00d9a3]" />
            </div>
            <h3 className="font-['Arimo',sans-serif] text-white text-xl">Warehouse Locations</h3>
          </div>

          {loading ? (
            <div className="text-center py-8">
              <p className="font-['Arimo',sans-serif] text-[#8ba6ac] text-base">Loading warehouses...</p>
            </div>
          ) : error ? (
            <div className="text-center py-8">
              <p className="font-['Arimo',sans-serif] text-red-400 text-base">{error}</p>
              <button 
                onClick={fetchWarehouses}
                className="mt-4 px-4 py-2 bg-[#00d9a3] text-[#1e3338] rounded-lg hover:opacity-80"
              >
                Retry
              </button>
            </div>
          ) : warehouses.length === 0 ? (
            <div className="text-center py-8">
              <p className="font-['Arimo',sans-serif] text-[#8ba6ac] text-base">No warehouses found. Add your first warehouse to get started!</p>
            </div>
          ) : (
            <div className="space-y-4">
              {warehouses.map((warehouse) => (
                <div
                  key={warehouse.id}
                  className="bg-[#2c4b52] rounded-xl border border-[#3a5a62] p-6"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h4 className="font-['Arimo',sans-serif] text-white text-base mb-2">{warehouse.name}</h4>
                      <div className="bg-[#00d9a3]/20 rounded-lg px-3 py-1 inline-block">
                        <span className="font-['Arimo',sans-serif] text-[#00d9a3] text-base">{warehouse.code}</span>
                      </div>
                    </div>
                    <button className="text-[#6b8690] hover:text-white transition-colors">
                      <MapPin className="w-5 h-5" />
                    </button>
                  </div>
                  {warehouse.location && (
                    <p className="font-['Arimo',sans-serif] text-[#8ba6ac] text-base">{warehouse.location}</p>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-[#1e3338] rounded-xl border border-[#3a5a62] p-6">
            <p className="font-['Arimo',sans-serif] text-[#8ba6ac] text-base mb-2">Total Warehouses</p>
            <p className="font-['Arimo',sans-serif] text-white text-3xl">{warehouses.length}</p>
          </div>
          <div className="bg-[#1e3338] rounded-xl border border-[#3a5a62] p-6">
            <p className="font-['Arimo',sans-serif] text-[#8ba6ac] text-base mb-2">Active Locations</p>
            <p className="font-['Arimo',sans-serif] text-[#00d9a3] text-3xl">{warehouses.length}</p>
          </div>
          <div className="bg-[#1e3338] rounded-xl border border-[#3a5a62] p-6">
            <p className="font-['Arimo',sans-serif] text-[#8ba6ac] text-base mb-2">Total Capacity</p>
            <p className="font-['Arimo',sans-serif] text-white text-3xl">15,000 m²</p>
          </div>
        </div>
      </div>

      {showNewWarehouseModal && (
        <NewWarehouseModal
          onClose={() => setShowNewWarehouseModal(false)}
          onSave={handleSaveWarehouse}
        />
      )}
    </div>
  );
}
