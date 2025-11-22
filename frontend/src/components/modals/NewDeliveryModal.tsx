import { useState } from "react";
import { X, Truck } from "lucide-react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";

interface NewDeliveryModalProps {
  onClose: () => void;
  onSave: (data: any) => void;
}

export function NewDeliveryModal({ onClose, onSave }: NewDeliveryModalProps) {
  const [formData, setFormData] = useState({
    customer: "",
    destination: "",
    items: "",
    deliveryDate: "",
    notes: ""
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
              <Truck className="w-6 h-6 text-[#00d9a3]" />
            </div>
            <h2 className="font-['Arimo',sans-serif] text-white text-2xl">Add New Delivery</h2>
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
            <Label htmlFor="customer" className="font-['Arimo',sans-serif] text-[#b4cdd4] text-base mb-2 block">
              Customer Name
            </Label>
            <Input
              id="customer"
              value={formData.customer}
              onChange={(e) => setFormData({ ...formData, customer: e.target.value })}
              placeholder="Enter customer name"
              className="bg-[#2c4b52] border-[#3a5a62] text-white placeholder:text-[#6b8690] focus:ring-[#00d9a3] focus:border-[#00d9a3] h-12 rounded-lg font-['Arimo',sans-serif]"
            />
          </div>

          <div>
            <Label htmlFor="destination" className="font-['Arimo',sans-serif] text-[#b4cdd4] text-base mb-2 block">
              Destination Address
            </Label>
            <Input
              id="destination"
              value={formData.destination}
              onChange={(e) => setFormData({ ...formData, destination: e.target.value })}
              placeholder="Enter delivery address"
              className="bg-[#2c4b52] border-[#3a5a62] text-white placeholder:text-[#6b8690] focus:ring-[#00d9a3] focus:border-[#00d9a3] h-12 rounded-lg font-['Arimo',sans-serif]"
            />
          </div>

          <div>
            <Label htmlFor="items" className="font-['Arimo',sans-serif] text-[#b4cdd4] text-base mb-2 block">
              Number of Items
            </Label>
            <Input
              id="items"
              type="number"
              value={formData.items}
              onChange={(e) => setFormData({ ...formData, items: e.target.value })}
              placeholder="Enter number of items"
              className="bg-[#2c4b52] border-[#3a5a62] text-white placeholder:text-[#6b8690] focus:ring-[#00d9a3] focus:border-[#00d9a3] h-12 rounded-lg font-['Arimo',sans-serif]"
            />
          </div>

          <div>
            <Label htmlFor="deliveryDate" className="font-['Arimo',sans-serif] text-[#b4cdd4] text-base mb-2 block">
              Delivery Date
            </Label>
            <Input
              id="deliveryDate"
              type="date"
              value={formData.deliveryDate}
              onChange={(e) => setFormData({ ...formData, deliveryDate: e.target.value })}
              className="bg-[#2c4b52] border-[#3a5a62] text-white focus:ring-[#00d9a3] focus:border-[#00d9a3] h-12 rounded-lg font-['Arimo',sans-serif]"
            />
          </div>

          <div>
            <Label htmlFor="notes" className="font-['Arimo',sans-serif] text-[#b4cdd4] text-base mb-2 block">
              Delivery Notes
            </Label>
            <textarea
              id="notes"
              value={formData.notes}
              onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
              placeholder="Enter delivery instructions"
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
              Save Delivery
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
