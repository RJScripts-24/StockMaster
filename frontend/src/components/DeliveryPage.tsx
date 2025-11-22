import { useState, useEffect } from "react";
import { Search, Menu, LayoutGrid } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Navigation } from "./Navigation";
import { NewDeliveryForm } from "./NewDeliveryForm";
import { deliveriesService } from "../services/api";
import type { Delivery } from "../types";

interface DeliveryPageProps {
  onNavigate: (page: string) => void;
}

export function DeliveryPage({ onNavigate }: DeliveryPageProps) {
  const [showNewDeliveryForm, setShowNewDeliveryForm] = useState(false);
  const [deliveries, setDeliveries] = useState<Delivery[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    fetchDeliveries();
  }, []);

  const fetchDeliveries = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await deliveriesService.getAll();
      setDeliveries(response.data || []);
    } catch (err: any) {
      console.error('Failed to fetch deliveries:', err);
      setError(err.message || 'Failed to load deliveries');
    } finally {
      setLoading(false);
    }
  };

  const handleSaveDelivery = async (data: any) => {
    try {
      await deliveriesService.create(data);
      await fetchDeliveries();
      setShowNewDeliveryForm(false);
      alert('Delivery created successfully!');
    } catch (err: any) {
      console.error('Failed to create delivery:', err);
      alert(err.message || 'Failed to create delivery');
    }
  };

  if (showNewDeliveryForm) {
    return (
      <NewDeliveryForm 
        onNavigate={onNavigate}
        onSave={handleSaveDelivery}
        onCancel={() => setShowNewDeliveryForm(false)}
      />
    );
  }

  const filteredDeliveries = deliveries.filter(delivery =>
    (delivery.referenceNo || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
    (delivery.customerName || '').toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalDeliveries = filteredDeliveries.length;
  const pendingCount = filteredDeliveries.filter(d => d.status === "pending").length;
  const validatedCount = filteredDeliveries.filter(d => d.status === "validated").length;
  const cancelledCount = filteredDeliveries.filter(d => d.status === "cancelled").length;

  return (
    <div className="min-h-screen bg-[#2c4b52] flex flex-col">
      <Navigation activeMenu="operations" onNavigate={onNavigate} />

      <div className="flex-1 px-6 py-8">
        {/* Header Section */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <Button 
              onClick={() => setShowNewDeliveryForm(true)}
              className="bg-transparent border-2 border-[#00d9a3] text-[#00d9a3] hover:bg-[#00d9a3] hover:text-[#1e3338] h-11 px-4 rounded-[10px] font-['Arimo',sans-serif] flex items-center gap-2"
            >
              + NEW
            </Button>
            <h2 className="font-['Arimo',sans-serif] text-white text-3xl">Delivery</h2>
          </div>

          <div className="flex items-center gap-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-[#6b8690]" />
              <Input
                type="text"
                placeholder="Search deliveries..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-[#2c4b52] border-[#3a5a62] text-white placeholder:text-[#6b8690] focus:ring-[#00d9a3] focus:border-[#00d9a3] h-10 rounded-lg font-['Arimo',sans-serif] w-64"
              />
            </div>
            <button className="bg-[#00d9a3] hover:bg-[#00c794] text-[#1e3338] rounded-lg size-10 flex items-center justify-center">
              <Menu className="w-5 h-5" />
            </button>
            <button className="bg-[#2c4b52] hover:bg-[#3a5a62] border border-[#3a5a62] text-white rounded-lg size-10 flex items-center justify-center">
              <LayoutGrid className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Table */}
        <div className="bg-[#1e3338] rounded-xl border border-[#3a5a62] overflow-hidden mb-8">
          {loading ? (
            <div className="text-center py-12">
              <p className="font-['Arimo',sans-serif] text-[#8ba6ac] text-base">Loading deliveries...</p>
            </div>
          ) : error ? (
            <div className="text-center py-12">
              <p className="font-['Arimo',sans-serif] text-red-400 text-base mb-4">{error}</p>
              <button
                onClick={fetchDeliveries}
                className="px-4 py-2 bg-[#00d9a3] text-[#1e3338] rounded-lg hover:opacity-80"
              >
                Retry
              </button>
            </div>
          ) : filteredDeliveries.length === 0 ? (
            <div className="text-center py-12">
              <p className="font-['Arimo',sans-serif] text-[#8ba6ac] text-base">
                {searchQuery ? 'No deliveries found matching your search.' : 'No deliveries yet. Click "+ NEW" to create your first delivery.'}
              </p>
            </div>
          ) : (
          <table className="w-full">
            <thead>
              <tr className="border-b border-[#3a5a62]">
                <th className="text-left p-4 font-['Arimo',sans-serif] text-[#b4cdd4] text-base">Reference</th>
                <th className="text-left p-4 font-['Arimo',sans-serif] text-[#b4cdd4] text-base">Customer</th>
                <th className="text-left p-4 font-['Arimo',sans-serif] text-[#b4cdd4] text-base">Warehouse</th>
                <th className="text-left p-4 font-['Arimo',sans-serif] text-[#b4cdd4] text-base">Items</th>
                <th className="text-left p-4 font-['Arimo',sans-serif] text-[#b4cdd4] text-base">Date</th>
                <th className="text-left p-4 font-['Arimo',sans-serif] text-[#b4cdd4] text-base">Status</th>
              </tr>
            </thead>
            <tbody>
              {filteredDeliveries.map((delivery) => (
                <tr
                  key={delivery.id}
                  className="border-b border-[#3a5a62] hover:bg-[#2c4b52] transition-colors cursor-pointer"
                >
                  <td className="p-4">
                    <span className="font-['Arimo',sans-serif] text-base text-[#ff6b6b]">
                      {delivery.referenceNo || `DEL-${delivery.id}`}
                    </span>
                  </td>
                  <td className="p-4 font-['Arimo',sans-serif] text-[#00d9a3] text-base">{delivery.customerName}</td>
                  <td className="p-4 font-['Arimo',sans-serif] text-white text-base">{delivery.warehouse?.name || `Warehouse ${delivery.warehouseId}`}</td>
                  <td className="p-4 font-['Arimo',sans-serif] text-white text-base">{delivery.items?.length || 0}</td>
                  <td className="p-4 font-['Arimo',sans-serif] text-white text-base">{new Date(delivery.createdAt).toLocaleDateString()}</td>
                  <td className="p-4">
                    <span
                      className={`font-['Arimo',sans-serif] text-base ${
                        delivery.status === "validated"
                          ? "text-[#00d9a3]"
                          : delivery.status === "cancelled"
                          ? "text-[#ff6b6b]"
                          : "text-orange-500"
                      }`}
                    >
                      {delivery.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          )}
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-[#1e3338] rounded-xl border border-[#3a5a62] p-6">
            <p className="font-['Arimo',sans-serif] text-[#b4cdd4] text-base mb-2">Total Deliveries</p>
            <p className="font-['Arimo',sans-serif] text-white text-4xl">{totalDeliveries}</p>
          </div>
          <div className="bg-[#1e3338] rounded-xl border border-[#3a5a62] p-6">
            <p className="font-['Arimo',sans-serif] text-[#b4cdd4] text-base mb-2">Pending</p>
            <p className="font-['Arimo',sans-serif] text-orange-500 text-4xl">{pendingCount}</p>
          </div>
          <div className="bg-[#1e3338] rounded-xl border border-[#3a5a62] p-6">
            <p className="font-['Arimo',sans-serif] text-[#b4cdd4] text-base mb-2">Validated</p>
            <p className="font-['Arimo',sans-serif] text-[#00d9a3] text-4xl">{validatedCount}</p>
          </div>
          <div className="bg-[#1e3338] rounded-xl border border-[#3a5a62] p-6">
            <p className="font-['Arimo',sans-serif] text-[#b4cdd4] text-base mb-2">Cancelled</p>
            <p className="font-['Arimo',sans-serif] text-[#ff6b6b] text-4xl">{cancelledCount}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
