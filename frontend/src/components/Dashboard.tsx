import { useEffect, useState } from "react";
import { Package, Truck } from "lucide-react";
import { Navigation } from "./Navigation";
import { dashboardService } from "../services/api";

interface DashboardProps {
  onNavigate: (page: string) => void;
  onLogout?: () => void;
}

export function Dashboard({ onNavigate, onLogout }: DashboardProps) {
  const [stats, setStats] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    (async () => {
      setLoading(true);
      setError("");
      try {
        const data = await dashboardService.getStats();
        setStats(data);
      } catch (err: any) {
        setError("Failed to load dashboard stats");
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  return (
    <div className="min-h-screen bg-[#2c4b52] flex flex-col">
      <Navigation activeMenu="dashboard" onNavigate={onNavigate} />
      <div className="flex-1 px-6 py-8">
        <div className="mb-8 flex justify-between items-center">
          <div>
            <h2 className="font-['Arimo',sans-serif] text-white text-3xl mb-2">Dashboard</h2>
            <p className="font-['Arimo',sans-serif] text-[#8ba6ac] text-base">Current statistics and operations overview</p>
          </div>
          {onLogout && (
            <button onClick={onLogout} className="bg-[#ff6b6b] text-white px-4 py-2 rounded-lg hover:bg-[#e55b5b]">Logout</button>
          )}
        </div>
        {loading ? (
          <div className="text-white">Loading dashboard...</div>
        ) : error ? (
          <div className="text-red-400">{error}</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            {/* Receipt Card */}
            <div className="bg-[#1e3338] rounded-2xl border border-[#3a5a62] p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="bg-[#2c4b52] rounded-lg size-12 flex items-center justify-center">
                  <Package className="w-6 h-6 text-[#00d9a3]" />
                </div>
                <h3 className="font-['Arimo',sans-serif] text-white text-2xl">Receipt</h3>
              </div>
              <div 
                onClick={() => onNavigate("receipts")}
                className="bg-[#2c4b52] border-2 border-[#00d9a3] rounded-xl p-6 mb-6 cursor-pointer hover:bg-[#3a5a62] transition-colors"
              >
                <p className="font-['Arimo',sans-serif] text-[#00d9a3] text-3xl">{stats?.recentReceipts ?? 0} to receive</p>
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-['Arimo',sans-serif] text-[#b4cdd4] text-base">Low Stock:</span>
                  <span className="font-['Arimo',sans-serif] text-[#ff6b6b] text-xl">{stats?.lowStockProducts ?? 0} products</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="font-['Arimo',sans-serif] text-[#b4cdd4] text-base">Total Products:</span>
                  <span className="font-['Arimo',sans-serif] text-[#00d9a3] text-xl">{stats?.totalProducts ?? 0}</span>
                </div>
              </div>
            </div>
            {/* Delivery Card */}
            <div className="bg-[#1e3338] rounded-2xl border border-[#3a5a62] p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="bg-[#2c4b52] rounded-lg size-12 flex items-center justify-center">
                  <Truck className="w-6 h-6 text-[#00d9a3]" />
                </div>
                <h3 className="font-['Arimo',sans-serif] text-white text-2xl">Delivery</h3>
              </div>
              <div 
                onClick={() => onNavigate("delivery")}
                className="bg-[#2c4b52] border-2 border-[#00d9a3] rounded-xl p-6 mb-6 cursor-pointer hover:bg-[#3a5a62] transition-colors"
              >
                <p className="font-['Arimo',sans-serif] text-[#00d9a3] text-3xl">{stats?.recentDeliveries ?? 0} to deliver</p>
              </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-['Arimo',sans-serif] text-[#b4cdd4] text-base">Recent Transfers:</span>
                <span className="font-['Arimo',sans-serif] text-[#00d9a3] text-xl">{stats?.recentTransfers ?? 0}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="font-['Arimo',sans-serif] text-[#b4cdd4] text-base">Total Warehouses:</span>
                <span className="font-['Arimo',sans-serif] text-[#00d9a3] text-xl">{stats?.totalWarehouses ?? 0}</span>
              </div>
            </div>
          </div>
        </div>
        )}

        {/* Quick Actions */}
        <div>
          <h3 className="font-['Arimo',sans-serif] text-white text-xl mb-4">Quick Actions</h3>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <button
              onClick={() => onNavigate("receipts")}
              className="bg-[#1e3338] border border-[#3a5a62] rounded-xl p-4 font-['Arimo',sans-serif] text-[#b4cdd4] text-base hover:bg-[#2c4b52] hover:text-[#00d9a3] transition-all"
            >
              New Receipt
            </button>
            <button
              onClick={() => onNavigate("delivery")}
              className="bg-[#1e3338] border border-[#3a5a62] rounded-xl p-4 font-['Arimo',sans-serif] text-[#b4cdd4] text-base hover:bg-[#2c4b52] hover:text-[#00d9a3] transition-all"
            >
              New Delivery
            </button>
            <button
              onClick={() => onNavigate("products")}
              className="bg-[#1e3338] border border-[#3a5a62] rounded-xl p-4 font-['Arimo',sans-serif] text-[#b4cdd4] text-base hover:bg-[#2c4b52] hover:text-[#00d9a3] transition-all"
            >
              View Products
            </button>
            <button
              onClick={() => onNavigate("warehouse")}
              className="bg-[#1e3338] border border-[#3a5a62] rounded-xl p-4 font-['Arimo',sans-serif] text-[#b4cdd4] text-base hover:bg-[#2c4b52] hover:text-[#00d9a3] transition-all"
            >
              Manage Warehouse
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
