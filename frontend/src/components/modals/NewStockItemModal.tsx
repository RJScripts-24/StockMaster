import { useState } from "react";
import { X, Package } from "lucide-react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";

interface NewStockItemModalProps {
  onClose: () => void;
  onSave: (data: any) => void;
}

export function NewStockItemModal({ onClose, onSave }: NewStockItemModalProps) {
  const [formData, setFormData] = useState({
    sku: "",
    name: "",
    category: "",
    quantity: "",
    location: ""
  });

  const handleSubmit = () => {
    onSave(formData);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-[#1e3338] rounded-2xl border border-[#3a5a62] p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="bg-[#2c4b52] rounded-lg size-10 flex items-center justify-center">
              <Package className="w-6 h-6 text-[#00d9a3]" />
            </div>
            <h2 className="font-['Arimo',sans-serif] text-white text-2xl">Add Stock Item</h2>
          </div>
          <button
            onClick={onClose}
            className="text-[#b4cdd4] hover:text-white transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Form */}
        <div className="space-y-4">
          <div>
            <Label htmlFor="sku" className="font-['Arimo',sans-serif] text-[#b4cdd4] text-base mb-2 block">
              SKU
            </Label>
            <Input
              id="sku"
              value={formData.sku}
              onChange={(e) => setFormData({ ...formData, sku: e.target.value })}
              placeholder="e.g., SKU-001"
              className="bg-[#2c4b52] border-[#3a5a62] text-white placeholder:text-[#6b8690] focus:ring-[#00d9a3] focus:border-[#00d9a3] h-12 rounded-lg font-['Arimo',sans-serif]"
            />
          </div>

          <div>
            <Label htmlFor="name" className="font-['Arimo',sans-serif] text-[#b4cdd4] text-base mb-2 block">
              Product Name
            </Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="Enter product name"
              className="bg-[#2c4b52] border-[#3a5a62] text-white placeholder:text-[#6b8690] focus:ring-[#00d9a3] focus:border-[#00d9a3] h-12 rounded-lg font-['Arimo',sans-serif]"
            />
          </div>

          <div>
            <Label htmlFor="category" className="font-['Arimo',sans-serif] text-[#b4cdd4] text-base mb-2 block">
              Category
            </Label>
            <select
              id="category"
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              className="w-full bg-[#2c4b52] border border-[#3a5a62] text-white focus:ring-[#00d9a3] focus:border-[#00d9a3] h-12 rounded-lg px-3 font-['Arimo',sans-serif]"
            >
              <option value="">Select category</option>
              <option value="Electronics">Electronics</option>
              <option value="Furniture">Furniture</option>
              <option value="Supplies">Supplies</option>
              <option value="Other">Other</option>
            </select>
          </div>

          <div>
            <Label htmlFor="quantity" className="font-['Arimo',sans-serif] text-[#b4cdd4] text-base mb-2 block">
              Initial Quantity
            </Label>
            <Input
              id="quantity"
              type="number"
              value={formData.quantity}
              onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
              placeholder="Enter quantity"
              className="bg-[#2c4b52] border-[#3a5a62] text-white placeholder:text-[#6b8690] focus:ring-[#00d9a3] focus:border-[#00d9a3] h-12 rounded-lg font-['Arimo',sans-serif]"
            />
          </div>

          <div>
            <Label htmlFor="location" className="font-['Arimo',sans-serif] text-[#b4cdd4] text-base mb-2 block">
              Warehouse Location
            </Label>
            <select
              id="location"
              value={formData.location}
              onChange={(e) => setFormData({ ...formData, location: e.target.value })}
              className="w-full bg-[#2c4b52] border border-[#3a5a62] text-white focus:ring-[#00d9a3] focus:border-[#00d9a3] h-12 rounded-lg px-3 font-['Arimo',sans-serif]"
            >
              <option value="">Select warehouse</option>
              <option value="Warehouse A">Warehouse A</option>
              <option value="Warehouse B">Warehouse B</option>
              <option value="Warehouse C">Warehouse C</option>
            </select>
          </div>

          <div className="flex gap-4 pt-4">
            <Button
              onClick={onClose}
              variant="outline"
              className="flex-1 h-12 border-[#3a5a62] text-[#b4cdd4] hover:bg-[#2c4b52] hover:text-white font-['Arimo',sans-serif]"
            >
              Cancel
            </Button>
            <Button
              onClick={handleSubmit}
              className="flex-1 h-12 bg-[#00d9a3] hover:bg-[#00c794] text-[#1e3338] font-['Arimo',sans-serif]"
            >
              Add to Stock
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
