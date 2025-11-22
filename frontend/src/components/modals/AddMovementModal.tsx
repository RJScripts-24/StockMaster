import { useState } from "react";
import { X } from "lucide-react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";

interface AddMovementModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddMovement: (movement: any) => void;
}

export function AddMovementModal({ isOpen, onClose, onAddMovement }: AddMovementModalProps) {
  const [formData, setFormData] = useState({
    type: "in",
    contact: "",
    from: "",
    to: "",
    product: "",
    quantity: 0,
    date: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newMovement = {
      reference: formData.type === "in" 
        ? `WH/IN/${String(Math.floor(Math.random() * 9999)).padStart(4, '0')}`
        : `WH/OUT/${String(Math.floor(Math.random() * 9999)).padStart(4, '0')}`,
      type: formData.type,
      date: formData.date,
      contact: formData.contact,
      from: formData.from,
      to: formData.to,
      product: formData.product,
      quantity: formData.quantity,
      status: "Draft"
    };
    onAddMovement(newMovement);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-[#1e3338] rounded-2xl border border-[#3a5a62] w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-[#3a5a62]">
          <h2 className="font-['Arimo',sans-serif] text-white text-2xl">New Movement</h2>
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
              <Label htmlFor="type" className="font-['Arimo',sans-serif] text-[#00d9a3] text-base mb-2 block">
                Movement Type *
              </Label>
              <select
                id="type"
                value={formData.type}
                onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                className="w-full bg-[#2c4b52] border border-[#3a5a62] text-white rounded-lg h-11 px-3 font-['Arimo',sans-serif] focus:ring-[#00d9a3] focus:border-[#00d9a3]"
              >
                <option value="in">Inbound (WH/IN)</option>
                <option value="out">Outbound (WH/OUT)</option>
              </select>
            </div>

            <div>
              <Label htmlFor="date" className="font-['Arimo',sans-serif] text-[#00d9a3] text-base mb-2 block">
                Date *
              </Label>
              <Input
                id="date"
                type="date"
                value={formData.date}
                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                className="bg-[#2c4b52] border-[#3a5a62] text-white focus:ring-[#00d9a3] focus:border-[#00d9a3] h-11 rounded-lg font-['Arimo',sans-serif]"
                required
              />
            </div>

            <div>
              <Label htmlFor="contact" className="font-['Arimo',sans-serif] text-[#00d9a3] text-base mb-2 block">
                Contact *
              </Label>
              <Input
                id="contact"
                value={formData.contact}
                onChange={(e) => setFormData({ ...formData, contact: e.target.value })}
                placeholder="Enter contact name"
                className="bg-[#2c4b52] border-[#3a5a62] text-white placeholder:text-[#6b8690] focus:ring-[#00d9a3] focus:border-[#00d9a3] h-11 rounded-lg font-['Arimo',sans-serif]"
                required
              />
            </div>

            <div>
              <Label htmlFor="product" className="font-['Arimo',sans-serif] text-[#00d9a3] text-base mb-2 block">
                Product *
              </Label>
              <Input
                id="product"
                value={formData.product}
                onChange={(e) => setFormData({ ...formData, product: e.target.value })}
                placeholder="Enter product name"
                className="bg-[#2c4b52] border-[#3a5a62] text-white placeholder:text-[#6b8690] focus:ring-[#00d9a3] focus:border-[#00d9a3] h-11 rounded-lg font-['Arimo',sans-serif]"
                required
              />
            </div>

            <div>
              <Label htmlFor="from" className="font-['Arimo',sans-serif] text-[#00d9a3] text-base mb-2 block">
                From *
              </Label>
              <Input
                id="from"
                value={formData.from}
                onChange={(e) => setFormData({ ...formData, from: e.target.value })}
                placeholder="e.g., vendor or WH/Stock1"
                className="bg-[#2c4b52] border-[#3a5a62] text-white placeholder:text-[#6b8690] focus:ring-[#00d9a3] focus:border-[#00d9a3] h-11 rounded-lg font-['Arimo',sans-serif]"
                required
              />
            </div>

            <div>
              <Label htmlFor="to" className="font-['Arimo',sans-serif] text-[#00d9a3] text-base mb-2 block">
                To *
              </Label>
              <Input
                id="to"
                value={formData.to}
                onChange={(e) => setFormData({ ...formData, to: e.target.value })}
                placeholder="e.g., WH/Stock1 or vendor"
                className="bg-[#2c4b52] border-[#3a5a62] text-white placeholder:text-[#6b8690] focus:ring-[#00d9a3] focus:border-[#00d9a3] h-11 rounded-lg font-['Arimo',sans-serif]"
                required
              />
            </div>

            <div>
              <Label htmlFor="quantity" className="font-['Arimo',sans-serif] text-[#00d9a3] text-base mb-2 block">
                Quantity *
              </Label>
              <Input
                id="quantity"
                type="number"
                value={formData.quantity}
                onChange={(e) => setFormData({ ...formData, quantity: parseInt(e.target.value) })}
                placeholder="0"
                className="bg-[#2c4b52] border-[#3a5a62] text-white placeholder:text-[#6b8690] focus:ring-[#00d9a3] focus:border-[#00d9a3] h-11 rounded-lg font-['Arimo',sans-serif]"
                required
              />
            </div>
          </div>

          {/* Buttons */}
          <div className="flex gap-4 pt-4">
            <Button
              type="submit"
              className="flex-1 bg-[#00d9a3] hover:bg-[#00c794] text-[#1e3338] h-11 rounded-lg font-['Arimo',sans-serif]"
            >
              Create Movement
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
