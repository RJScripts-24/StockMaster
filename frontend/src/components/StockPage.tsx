import { useState } from "react";
import { Search, Plus, Filter } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Navigation } from "./Navigation";
import { NewStockItemModal } from "./modals/NewStockItemModal";

interface StockPageProps {
  onNavigate: (page: string) => void;
}

export function StockPage({ onNavigate }: StockPageProps) {
  const [showNewStockModal, setShowNewStockModal] = useState(false);
  const [mockStock, setMockStock] = useState([
    { id: "SKU-001", name: "Product A", category: "Electronics", quantity: 150, location: "Warehouse A", status: "In Stock" },
    { id: "SKU-002", name: "Product B", category: "Furniture", quantity: 45, location: "Warehouse B", status: "Low Stock" },
    { id: "SKU-003", name: "Product C", category: "Electronics", quantity: 0, location: "Warehouse A", status: "Out of Stock" },
    { id: "SKU-004", name: "Product D", category: "Supplies", quantity: 230, location: "Warehouse C", status: "In Stock" },
    { id: "SKU-005", name: "Product E", category: "Furniture", quantity: 89, location: "Warehouse B", status: "In Stock" },
  ]);

  const handleSaveStock = (data: any) => {
    const newStock = {
      id: data.sku,
      name: data.name,
      category: data.category,
      quantity: parseInt(data.quantity),
      location: data.location,
      status: parseInt(data.quantity) > 50 ? "In Stock" : parseInt(data.quantity) > 0 ? "Low Stock" : "Out of Stock"
    };
    setMockStock([...mockStock, newStock]);
  };

  return (
    <div className="min-h-screen bg-[#2c4b52] flex flex-col">
      <Navigation activeMenu="stock" onNavigate={onNavigate} />

      <div className="flex-1 px-6 py-8">
        {/* Header */}
        <div className="mb-8">
          <h2 className="font-['Arimo',sans-serif] text-white text-3xl mb-2">Stock Management</h2>
          <p className="font-['Arimo',sans-serif] text-[#8ba6ac] text-base">List the available stock</p>
        </div>

        {/* Search and Add Button */}
        <div className="flex gap-4 mb-6">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-[#6b8690]" />
            <Input
              type="text"
              placeholder="Search stock items..."
              className="pl-10 bg-[#2c4b52] border-[#3a5a62] text-white placeholder:text-[#6b8690] focus:ring-[#00d9a3] focus:border-[#00d9a3] h-12 rounded-lg font-['Arimo',sans-serif]"
            />
          </div>
          <Button 
            onClick={() => setShowNewStockModal(true)}
            className="bg-[#00d9a3] hover:bg-[#00c794] text-[#1e3338] h-12 px-6 rounded-lg font-['Arimo',sans-serif]"
          >
            <Plus className="w-5 h-5 mr-2" />
            Add Stock Item
          </Button>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-[#1e3338] rounded-xl border border-[#3a5a62] p-6">
            <p className="font-['Arimo',sans-serif] text-[#b4cdd4] text-sm mb-2">Total Items</p>
            <p className="font-['Arimo',sans-serif] text-[#00d9a3] text-3xl">{mockStock.length}</p>
          </div>
          <div className="bg-[#1e3338] rounded-xl border border-[#3a5a62] p-6">
            <p className="font-['Arimo',sans-serif] text-[#b4cdd4] text-sm mb-2">In Stock</p>
            <p className="font-['Arimo',sans-serif] text-[#00d9a3] text-3xl">
              {mockStock.filter(s => s.status === "In Stock").length}
            </p>
          </div>
          <div className="bg-[#1e3338] rounded-xl border border-[#3a5a62] p-6">
            <p className="font-['Arimo',sans-serif] text-[#b4cdd4] text-sm mb-2">Low Stock</p>
            <p className="font-['Arimo',sans-serif] text-orange-500 text-3xl">
              {mockStock.filter(s => s.status === "Low Stock").length}
            </p>
          </div>
          <div className="bg-[#1e3338] rounded-xl border border-[#3a5a62] p-6">
            <p className="font-['Arimo',sans-serif] text-[#b4cdd4] text-sm mb-2">Out of Stock</p>
            <p className="font-['Arimo',sans-serif] text-[#ff6b6b] text-3xl">
              {mockStock.filter(s => s.status === "Out of Stock").length}
            </p>
          </div>
        </div>

        {/* Stock Table */}
        <div className="bg-[#1e3338] rounded-xl border border-[#3a5a62] overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="border-b border-[#3a5a62]">
                <th className="text-left p-4 font-['Arimo',sans-serif] text-[#b4cdd4] text-base">SKU</th>
                <th className="text-left p-4 font-['Arimo',sans-serif] text-[#b4cdd4] text-base">Product Name</th>
                <th className="text-left p-4 font-['Arimo',sans-serif] text-[#b4cdd4] text-base">Category</th>
                <th className="text-left p-4 font-['Arimo',sans-serif] text-[#b4cdd4] text-base">Quantity</th>
                <th className="text-left p-4 font-['Arimo',sans-serif] text-[#b4cdd4] text-base">Location</th>
                <th className="text-left p-4 font-['Arimo',sans-serif] text-[#b4cdd4] text-base">Status</th>
                <th className="text-left p-4 font-['Arimo',sans-serif] text-[#b4cdd4] text-base">Actions</th>
              </tr>
            </thead>
            <tbody>
              {mockStock.map((item) => (
                <tr
                  key={item.id}
                  className="border-b border-[#3a5a62] hover:bg-[#2c4b52] transition-colors"
                >
                  <td className="p-4 font-['Arimo',sans-serif] text-white text-base">{item.id}</td>
                  <td className="p-4 font-['Arimo',sans-serif] text-white text-base">{item.name}</td>
                  <td className="p-4 font-['Arimo',sans-serif] text-white text-base">{item.category}</td>
                  <td className="p-4 font-['Arimo',sans-serif] text-white text-base">{item.quantity}</td>
                  <td className="p-4 font-['Arimo',sans-serif] text-white text-base">{item.location}</td>
                  <td className="p-4">
                    <span
                      className={`px-3 py-1 rounded-lg text-sm font-['Arimo',sans-serif] ${
                        item.status === "In Stock"
                          ? "bg-[#00d9a3]/20 text-[#00d9a3]"
                          : item.status === "Out of Stock"
                          ? "bg-[#ff6b6b]/20 text-[#ff6b6b]"
                          : "bg-orange-500/20 text-orange-500"
                      }`}
                    >
                      {item.status}
                    </span>
                  </td>
                  <td className="p-4">
                    <button className="font-['Arimo',sans-serif] text-[#00d9a3] hover:text-[#00c794] text-base">
                      Edit
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {showNewStockModal && (
        <NewStockItemModal
          onClose={() => setShowNewStockModal(false)}
          onSave={handleSaveStock}
        />
      )}
    </div>
  );
}