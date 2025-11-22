import { useState, useEffect } from "react";
import { Search, Plus } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Navigation } from "./Navigation";
import { NewReceiptModal } from "./modals/NewReceiptModal";
import { receiptsService } from "../services/api";

interface ReceiptsPageProps {
  onNavigate: (page: string) => void;
}

export function ReceiptsPage({ onNavigate }: ReceiptsPageProps) {
  const [showNewReceiptModal, setShowNewReceiptModal] = useState(false);
  const [receipts, setReceipts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchReceipts = async () => {
    try {
      setLoading(true);
      setError("");
      const response = await receiptsService.getAll();
      // Handle backend response structure: { status: 'success', data: [...], pagination: {...} }
      const receiptsData = (response as any).data || response;
      setReceipts(Array.isArray(receiptsData) ? receiptsData : []);
    } catch (err: any) {
      setError("Failed to load receipts");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReceipts();
  }, []);

  const handleSaveReceipt = async (data: any) => {
    try {
      await receiptsService.create(data);
      await fetchReceipts(); // Refresh the list
      setShowNewReceiptModal(false);
    } catch (err: any) {
      console.error("Failed to create receipt:", err);
      alert("Failed to create receipt. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-[#2c4b52] flex flex-col">
      <Navigation activeMenu="operations" onNavigate={onNavigate} />

      <div className="flex-1 px-6 py-8">
        {/* Header */}
        <div className="mb-8">
          <h2 className="font-['Arimo',sans-serif] text-white text-3xl mb-2">Receipts</h2>
          <p className="font-['Arimo',sans-serif] text-[#8ba6ac] text-base">Manage all incoming receipts</p>
        </div>

        {/* Search and Add Button */}
        <div className="flex gap-4 mb-6">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-[#6b8690]" />
            <Input
              type="text"
              placeholder="Search receipts..."
              className="pl-10 bg-[#2c4b52] border-[#3a5a62] text-white placeholder:text-[#6b8690] focus:ring-[#00d9a3] focus:border-[#00d9a3] h-12 rounded-lg font-['Arimo',sans-serif]"
            />
          </div>
          <Button 
            onClick={() => setShowNewReceiptModal(true)}
            className="bg-[#00d9a3] hover:bg-[#00c794] text-[#1e3338] h-12 px-6 rounded-lg font-['Arimo',sans-serif]"
          >
            <Plus className="w-5 h-5 mr-2" />
            New Receipt
          </Button>
        </div>

        {/* Stats Overview */}
        {loading ? (
          <div className="text-white mb-6">Loading receipts...</div>
        ) : error ? (
          <div className="text-red-400 mb-6">{error}</div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
              <div className="bg-[#1e3338] rounded-xl border border-[#3a5a62] p-6">
                <p className="font-['Arimo',sans-serif] text-[#b4cdd4] text-sm mb-2">Total Receipts</p>
                <p className="font-['Arimo',sans-serif] text-[#00d9a3] text-3xl">{receipts.length}</p>
              </div>
              <div className="bg-[#1e3338] rounded-xl border border-[#3a5a62] p-6">
                <p className="font-['Arimo',sans-serif] text-[#b4cdd4] text-sm mb-2">Pending</p>
                <p className="font-['Arimo',sans-serif] text-[#00d9a3] text-3xl">
                  {receipts.filter(r => r.status === "pending").length}
                </p>
              </div>
              <div className="bg-[#1e3338] rounded-xl border border-[#3a5a62] p-6">
                <p className="font-['Arimo',sans-serif] text-[#b4cdd4] text-sm mb-2">Validated</p>
                <p className="font-['Arimo',sans-serif] text-[#00d9a3] text-3xl">
                  {receipts.filter(r => r.status === "validated").length}
                </p>
              </div>
              <div className="bg-[#1e3338] rounded-xl border border-[#3a5a62] p-6">
                <p className="font-['Arimo',sans-serif] text-[#b4cdd4] text-sm mb-2">Cancelled</p>
                <p className="font-['Arimo',sans-serif] text-[#ff6b6b] text-3xl">
                  {receipts.filter(r => r.status === "cancelled").length}
                </p>
              </div>
            </div>

            {/* Receipts Table */}
            <div className="bg-[#1e3338] rounded-xl border border-[#3a5a62] overflow-hidden">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-[#3a5a62]">
                    <th className="text-left p-4 font-['Arimo',sans-serif] text-[#b4cdd4] text-base">Receipt ID</th>
                    <th className="text-left p-4 font-['Arimo',sans-serif] text-[#b4cdd4] text-base">Reference</th>
                    <th className="text-left p-4 font-['Arimo',sans-serif] text-[#b4cdd4] text-base">Supplier</th>
                    <th className="text-left p-4 font-['Arimo',sans-serif] text-[#b4cdd4] text-base">Date</th>
                    <th className="text-left p-4 font-['Arimo',sans-serif] text-[#b4cdd4] text-base">Items</th>
                    <th className="text-left p-4 font-['Arimo',sans-serif] text-[#b4cdd4] text-base">Status</th>
                    <th className="text-left p-4 font-['Arimo',sans-serif] text-[#b4cdd4] text-base">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {receipts.length === 0 ? (
                    <tr>
                      <td colSpan={7} className="p-8 text-center font-['Arimo',sans-serif] text-[#8ba6ac] text-base">
                        No receipts found. Create your first receipt using the "New Receipt" button.
                      </td>
                    </tr>
                  ) : (
                    receipts.map((receipt) => (
                      <tr
                        key={receipt.id}
                        className="border-b border-[#3a5a62] hover:bg-[#2c4b52] transition-colors"
                      >
                        <td className="p-4 font-['Arimo',sans-serif] text-white text-base">#{receipt.id}</td>
                        <td className="p-4 font-['Arimo',sans-serif] text-white text-base">{receipt.referenceNo || '-'}</td>
                        <td className="p-4 font-['Arimo',sans-serif] text-white text-base">{receipt.supplierName}</td>
                        <td className="p-4 font-['Arimo',sans-serif] text-white text-base">
                          {new Date(receipt.createdAt).toLocaleDateString()}
                        </td>
                        <td className="p-4 font-['Arimo',sans-serif] text-white text-base">{receipt.items?.length || 0}</td>
                        <td className="p-4">
                          <span
                            className={`px-3 py-1 rounded-lg text-sm font-['Arimo',sans-serif] ${
                              receipt.status === "validated"
                                ? "bg-[#00d9a3]/20 text-[#00d9a3]"
                                : receipt.status === "cancelled"
                                ? "bg-[#ff6b6b]/20 text-[#ff6b6b]"
                                : "bg-orange-500/20 text-orange-500"
                            }`}
                          >
                            {receipt.status}
                          </span>
                        </td>
                        <td className="p-4">
                          <button className="font-['Arimo',sans-serif] text-[#00d9a3] hover:text-[#00c794] text-base">
                            View
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </>
        )}
      </div>

      {showNewReceiptModal && (
        <NewReceiptModal
          onClose={() => setShowNewReceiptModal(false)}
          onSave={handleSaveReceipt}
        />
      )}
    </div>
  );
}