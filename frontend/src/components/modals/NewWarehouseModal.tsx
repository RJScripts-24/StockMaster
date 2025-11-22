import { useState } from "react";
import { X, MapPin } from "lucide-react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";

interface NewWarehouseModalProps {
  onClose: () => void;
  onSave: (data: any) => void;
}

export function NewWarehouseModal({ onClose, onSave }: NewWarehouseModalProps) {
  const [formData, setFormData] = useState({
    name: "",
    shortCode: "",
    address: ""
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
              <MapPin className="w-6 h-6 text-[#00d9a3]" />
            </div>
            <h2 className="font-['Arimo',sans-serif] text-white text-2xl">Add New Warehouse</h2>
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
            <Label htmlFor="name" className="font-['Arimo',sans-serif] text-[#b4cdd4] text-base mb-2 block">
              Name:
            </Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="Enter warehouse name"
              className="bg-[#2c4b52] border-[#3a5a62] text-white placeholder:text-[#6b8690] focus:ring-[#00d9a3] focus:border-[#00d9a3] h-12 rounded-lg font-['Arimo',sans-serif]"
            />
          </div>

          <div>
            <Label htmlFor="shortCode" className="font-['Arimo',sans-serif] text-[#b4cdd4] text-base mb-2 block">
              Short Code:
            </Label>
            <Input
              id="shortCode"
              value={formData.shortCode}
              onChange={(e) => setFormData({ ...formData, shortCode: e.target.value })}
              placeholder="e.g., WH-001"
              className="bg-[#2c4b52] border-[#3a5a62] text-white placeholder:text-[#6b8690] focus:ring-[#00d9a3] focus:border-[#00d9a3] h-12 rounded-lg font-['Arimo',sans-serif]"
            />
          </div>

          <div>
            <Label htmlFor="address" className="font-['Arimo',sans-serif] text-[#b4cdd4] text-base mb-2 block">
              Address:
            </Label>
            <textarea
              id="address"
              value={formData.address}
              onChange={(e) => setFormData({ ...formData, address: e.target.value })}
              placeholder="Enter complete address"
              rows={4}
              className="w-full bg-[#2c4b52] border border-[#3a5a62] text-white placeholder:text-[#6b8690] focus:ring-[#00d9a3] focus:border-[#00d9a3] rounded-lg p-3 font-['Arimo',sans-serif] resize-none"
            />
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
              Save Warehouse
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
