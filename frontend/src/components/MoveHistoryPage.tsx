import { useState, useEffect } from "react";
import { Search, Plus, Menu, LayoutGrid } from "lucide-react";
import { Input } from "./ui/input";
import { Navigation } from "./Navigation";
import { Button } from "./ui/button";
import { AddMovementModal } from "./modals/AddMovementModal";
import { receiptsService } from "../services/api/receipts.service";
import { deliveriesService } from "../services/api/deliveries.service";
import { transfersService } from "../services/api/transfers.service";
import type { Receipt, Delivery, Transfer } from "../types";

interface MoveHistoryPageProps {
  onNavigate: (page: string) => void;
}

interface Movement {
  id: string;
  reference: string;
  type: "receipt" | "delivery" | "transfer";
  date: string;
  contact: string;
  from: string;
  to: string;
  product: string;
  quantity: number;
  status: string;
  statusColor: string;
}

export function MoveHistoryPage({ onNavigate }: MoveHistoryPageProps) {
  const [showAddMovementModal, setShowAddMovementModal] = useState(false);
  const [movements, setMovements] = useState<Movement[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    fetchMovements();
  }, []);

  const fetchMovements = async () => {
    try {
      setLoading(true);
      setError(null);

      // Fetch all data in parallel
      const [receiptsResponse, deliveriesResponse, transfersResponse] = await Promise.all([
        receiptsService.getAll().catch(() => ({ data: [], pagination: { page: 1, limit: 20, total: 0, totalPages: 0 } })),
        deliveriesService.getAll().catch(() => ({ data: [], pagination: { page: 1, limit: 20, total: 0, totalPages: 0 } })),
        transfersService.getAll().catch(() => ({ data: [], pagination: { page: 1, limit: 20, total: 0, totalPages: 0 } }))
      ]);

      const allMovements: Movement[] = [];

      // Process receipts (inbound movements)
      receiptsResponse.data.forEach((receipt: Receipt) => {
        receipt.items?.forEach(item => {
          allMovements.push({
            id: `receipt-${receipt.id}-${item.id}`,
            reference: receipt.receiptNumber || `RCP-${receipt.id}`,
            type: "receipt",
            date: new Date(receipt.receivedDate).toLocaleDateString(),
            contact: `Supplier ${receipt.supplierId || 'N/A'}`,
            from: "Supplier",
            to: item.location?.name || `Location ${item.locationId}`,
            product: item.product?.name || `Product ${item.productId}`,
            quantity: item.quantity,
            status: receipt.status,
            statusColor: receipt.status === 'COMPLETED' ? 'text-[#00d9a3]' : receipt.status === 'PENDING' ? 'text-orange-500' : 'text-[#ff6b6b]'
          });
        });
      });

      // Process deliveries (outbound movements)
      deliveriesResponse.data.forEach((delivery: Delivery) => {
        delivery.items?.forEach(item => {
          allMovements.push({
            id: `delivery-${delivery.id}-${item.id}`,
            reference: delivery.deliveryNumber || `DEL-${delivery.id}`,
            type: "delivery",
            date: new Date(delivery.deliveryDate).toLocaleDateString(),
            contact: `Customer ${delivery.customerId || 'N/A'}`,
            from: item.location?.name || `Location ${item.locationId}`,
            to: "Customer",
            product: item.product?.name || `Product ${item.productId}`,
            quantity: item.quantity,
            status: delivery.status,
            statusColor: delivery.status === 'COMPLETED' ? 'text-[#00d9a3]' : delivery.status === 'PENDING' ? 'text-orange-500' : 'text-[#ff6b6b]'
          });
        });
      });

      // Process transfers (internal movements)
      transfersResponse.data.forEach((transfer: Transfer) => {
        transfer.items?.forEach(item => {
          allMovements.push({
            id: `transfer-${transfer.id}-${item.id}`,
            reference: transfer.transferNumber || `TRF-${transfer.id}`,
            type: "transfer",
            date: new Date(transfer.transferDate).toLocaleDateString(),
            contact: "Internal Transfer",
            from: transfer.fromLocation?.name || `Location ${transfer.fromLocationId}`,
            to: transfer.toLocation?.name || `Location ${transfer.toLocationId}`,
            product: item.product?.name || `Product ${item.productId}`,
            quantity: item.quantity,
            status: transfer.status,
            statusColor: transfer.status === 'COMPLETED' ? 'text-[#00d9a3]' : transfer.status === 'PENDING' ? 'text-orange-500' : 'text-[#ff6b6b]'
          });
        });
      });

      // Sort by date (most recent first)
      allMovements.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

      setMovements(allMovements);
    } catch (err: any) {
      console.error('Failed to fetch movements:', err);
      setError(err.message || 'Failed to load movement history');
    } finally {
      setLoading(false);
    }
  };

  // Filter movements based on search query
  const filteredMovements = movements.filter(movement =>
    movement.reference.toLowerCase().includes(searchQuery.toLowerCase()) ||
    movement.contact.toLowerCase().includes(searchQuery.toLowerCase()) ||
    movement.product.toLowerCase().includes(searchQuery.toLowerCase()) ||
    movement.from.toLowerCase().includes(searchQuery.toLowerCase()) ||
    movement.to.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalMovements = filteredMovements.length;
  const receiptCount = filteredMovements.filter(m => m.type === "receipt").length;
  const deliveryCount = filteredMovements.filter(m => m.type === "delivery").length;
  const transferCount = filteredMovements.filter(m => m.type === "transfer").length;

  return (
    <div className="min-h-screen bg-[#2c4b52] flex flex-col">
      <Navigation activeMenu="history" onNavigate={onNavigate} />

      <div className="flex-1 px-6 py-8">
        {/* Header Section */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <Button className="bg-transparent border-2 border-[#00d9a3] text-[#00d9a3] hover:bg-[#00d9a3] hover:text-[#1e3338] h-10 px-4 rounded-lg font-['Arimo',sans-serif] flex items-center gap-2" onClick={() => setShowAddMovementModal(true)}>
              <Plus className="w-4 h-4" />
              NEW
            </Button>
            <h2 className="font-['Arimo',sans-serif] text-white text-3xl">Move History</h2>
          </div>

          <div className="flex items-center gap-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-[#6b8690]" />
              <Input
                type="text"
                placeholder="Search movements..."
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
              <p className="font-['Arimo',sans-serif] text-[#8ba6ac] text-base">Loading movement history...</p>
            </div>
          ) : error ? (
            <div className="text-center py-12">
              <p className="font-['Arimo',sans-serif] text-red-400 text-base mb-4">{error}</p>
              <button
                onClick={fetchMovements}
                className="px-4 py-2 bg-[#00d9a3] text-[#1e3338] rounded-lg hover:opacity-80"
              >
                Retry
              </button>
            </div>
          ) : filteredMovements.length === 0 ? (
            <div className="text-center py-12">
              <p className="font-['Arimo',sans-serif] text-[#8ba6ac] text-base">
                {searchQuery ? 'No movements found matching your search.' : 'No movement history available. Start by adding receipts, deliveries, or transfers.'}
              </p>
            </div>
          ) : (
            <table className="w-full">
              <thead>
                <tr className="border-b border-[#3a5a62]">
                  <th className="text-left p-4 font-['Arimo',sans-serif] text-[#b4cdd4] text-base">Reference</th>
                  <th className="text-left p-4 font-['Arimo',sans-serif] text-[#b4cdd4] text-base">Date</th>
                  <th className="text-left p-4 font-['Arimo',sans-serif] text-[#b4cdd4] text-base">Contact</th>
                  <th className="text-left p-4 font-['Arimo',sans-serif] text-[#b4cdd4] text-base">From</th>
                  <th className="text-left p-4 font-['Arimo',sans-serif] text-[#b4cdd4] text-base">To</th>
                  <th className="text-left p-4 font-['Arimo',sans-serif] text-[#b4cdd4] text-base">Product</th>
                  <th className="text-left p-4 font-['Arimo',sans-serif] text-[#b4cdd4] text-base">Quantity</th>
                  <th className="text-left p-4 font-['Arimo',sans-serif] text-[#b4cdd4] text-base">Status</th>
                </tr>
              </thead>
              <tbody>
                {filteredMovements.map((movement) => (
                  <tr
                    key={movement.id}
                    className="border-b border-[#3a5a62] hover:bg-[#2c4b52] transition-colors"
                  >
                    <td className="p-4">
                      <span className={`font-['Arimo',sans-serif] text-base ${
                        movement.type === "receipt" ? "text-[#00d9a3]" : movement.type === "delivery" ? "text-[#ff6b6b]" : "text-[#4a9eff]"
                      }`}>
                        {movement.reference}
                      </span>
                    </td>
                    <td className="p-4 font-['Arimo',sans-serif] text-white text-base">{movement.date}</td>
                    <td className="p-4 font-['Arimo',sans-serif] text-[#00d9a3] text-base">{movement.contact}</td>
                    <td className="p-4 font-['Arimo',sans-serif] text-white text-base">{movement.from}</td>
                    <td className="p-4 font-['Arimo',sans-serif] text-white text-base">{movement.to}</td>
                    <td className="p-4 font-['Arimo',sans-serif] text-white text-base">{movement.product}</td>
                    <td className="p-4 font-['Arimo',sans-serif] text-white text-base">{movement.quantity}</td>
                    <td className="p-4">
                      <span className={`font-['Arimo',sans-serif] text-base ${movement.statusColor}`}>
                        {movement.status}
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
            <p className="font-['Arimo',sans-serif] text-[#b4cdd4] text-base mb-2">Total Movements</p>
            <p className="font-['Arimo',sans-serif] text-white text-4xl">{totalMovements}</p>
          </div>
          <div className="bg-[#1e3338] rounded-xl border border-[#3a5a62] p-6">
            <p className="font-['Arimo',sans-serif] text-[#b4cdd4] text-base mb-2">Receipts</p>
            <p className="font-['Arimo',sans-serif] text-[#00d9a3] text-4xl">{receiptCount}</p>
          </div>
          <div className="bg-[#1e3338] rounded-xl border border-[#3a5a62] p-6">
            <p className="font-['Arimo',sans-serif] text-[#b4cdd4] text-base mb-2">Deliveries</p>
            <p className="font-['Arimo',sans-serif] text-[#ff6b6b] text-4xl">{deliveryCount}</p>
          </div>
          <div className="bg-[#1e3338] rounded-xl border border-[#3a5a62] p-6">
            <p className="font-['Arimo',sans-serif] text-[#b4cdd4] text-base mb-2">Transfers</p>
            <p className="font-['Arimo',sans-serif] text-[#4a9eff] text-4xl">{transferCount}</p>
          </div>
        </div>
      </div>

      {/* Add Movement Modal */}
      <AddMovementModal
        isOpen={showAddMovementModal}
        onClose={() => setShowAddMovementModal(false)}
        onAddMovement={(newMovement) => {
          // Refresh the movements list after adding
          fetchMovements();
          setShowAddMovementModal(false);
        }}
      />
    </div>
  );
}