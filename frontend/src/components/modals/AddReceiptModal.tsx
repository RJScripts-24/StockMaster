import { useState } from "react";
import { X } from "lucide-react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";

interface AddReceiptModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddReceipt: (receipt: any) => void;
}

export function AddReceiptModal({ isOpen, onClose, onAddReceipt }: AddReceiptModalProps) {
  const [formData, setFormData] = useState({
    vendor: "",
    scheduleDate: "",
    responsible: "",
    operationType: "Standard Receipt"
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newReceipt = {
      reference: `WH/IN/${String(Math.floor(Math.random() * 9999)).padStart(4, '0')}`,
      from: formData.vendor || "vendor",
      to: "WH/Stock1",
      contact: formData.responsible,
      scheduleDate: formData.scheduleDate,
      status: "Draft"
    };
    onAddReceipt(newReceipt);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-[#1e3338] rounded-2xl border border-[#3a5a62] w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-[#3a5a62]">
          <h2 className="font-['Arimo',sans-serif] text-white text-2xl">New Receipt</h2>
          <button
            onClick={onClose}
            className="text-[#6b8690] hover:text-white transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div className="grid grid-cols-2 gap-6">
            <div>
              <Label htmlFor="vendor" className="font-['Arimo',sans-serif] text-[#00d9a3] text-base mb-2 block">
                Vendor *
              </Label>
              <Input
                id="vendor"
                value={formData.vendor}
                onChange={(e) => setFormData({ ...formData, vendor: e.target.value })}
                placeholder="Enter vendor name"
                className="bg-[#2c4b52] border-[#3a5a62] text-white placeholder:text-[#6b8690] focus:ring-[#00d9a3] focus:border-[#00d9a3] h-11 rounded-lg font-['Arimo',sans-serif]"
                required
              />
            </div>

            <div>
              <Label htmlFor="scheduleDate" className="font-['Arimo',sans-serif] text-[#00d9a3] text-base mb-2 block">
                Schedule Date *
              </Label>
              <Input
                id="scheduleDate"
                type="date"
                value={formData.scheduleDate}
                onChange={(e) => setFormData({ ...formData, scheduleDate: e.target.value })}
                className="bg-[#2c4b52] border-[#3a5a62] text-white focus:ring-[#00d9a3] focus:border-[#00d9a3] h-11 rounded-lg font-['Arimo',sans-serif]"
                required
              />
            </div>

            <div>
              <Label htmlFor="responsible" className="font-['Arimo',sans-serif] text-[#00d9a3] text-base mb-2 block">
                Responsible Person *
              </Label>
              <Input
                id="responsible"
                value={formData.responsible}
                onChange={(e) => setFormData({ ...formData, responsible: e.target.value })}
                placeholder="Enter responsible person"
                className="bg-[#2c4b52] border-[#3a5a62] text-white placeholder:text-[#6b8690] focus:ring-[#00d9a3] focus:border-[#00d9a3] h-11 rounded-lg font-['Arimo',sans-serif]"
                required
              />
            </div>

            <div>
              <Label htmlFor="operationType" className="font-['Arimo',sans-serif] text-[#00d9a3] text-base mb-2 block">
                Operation Type
              </Label>
              <select
                id="operationType"
                value={formData.operationType}
                onChange={(e) => setFormData({ ...formData, operationType: e.target.value })}
                className="w-full bg-[#2c4b52] border border-[#3a5a62] text-white rounded-lg h-11 px-3 font-['Arimo',sans-serif] focus:ring-[#00d9a3] focus:border-[#00d9a3]"
              >
                <option value="Standard Receipt">Standard Receipt</option>
                <option value="Express Receipt">Express Receipt</option>
                <option value="Bulk Receipt">Bulk Receipt</option>
              </select>
            </div>
          </div>

          {/* Buttons */}
          <div className="flex gap-4 pt-4">
            <Button
              type="submit"
              className="flex-1 bg-[#00d9a3] hover:bg-[#00c794] text-[#1e3338] h-11 rounded-lg font-['Arimo',sans-serif]"
            >
              Create Receipt
            </Button>
            <Button
              type="button"
              onClick={onClose}
              className="flex-1 bg-transparent border border-[#3a5a62] text-[#b4cdd4] hover:bg-[#2c4b52] h-11 rounded-lg font-['Arimo',sans-serif]"
            >
              Cancel
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
