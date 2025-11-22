import { useState } from "react";
import { Trash2 } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Navigation } from "./Navigation";

interface NewDeliveryFormProps {
  onNavigate: (page: string) => void;
  onSave: (data: any) => void;
  onCancel: () => void;
}

export function NewDeliveryForm({ onNavigate, onSave, onCancel }: NewDeliveryFormProps) {
  const [formData, setFormData] = useState({
    deliveryAddress: "",
    scheduleDate: "",
    responsible: "",
    operationType: "",
  });

  const [products, setProducts] = useState([
    { name: "[DESK001] Desk", quantity: 6 }
  ]);

  const handleValidate = () => {
    onSave({
      ...formData,
      contact: formData.responsible,
      products: products
    });
  };

  const handleAddProduct = () => {
    setProducts([...products, { name: "", quantity: 0 }]);
  };

  const handleRemoveProduct = (index: number) => {
    setProducts(products.filter((_, i) => i !== index));
  };

  return (
    <div className="min-h-screen bg-[#2c4b52] flex flex-col">
      <Navigation activeMenu="operations" onNavigate={onNavigate} />

      <div className="flex-1 px-6 py-8">
        {/* Header Section */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <Button 
              className="bg-transparent border-2 border-[#00d9a3] text-[#00d9a3] hover:bg-[#00d9a3] hover:text-[#1e3338] h-11 px-4 rounded-[10px] font-['Arimo',sans-serif]"
            >
              New
            </Button>
            <h2 className="font-['Arimo',sans-serif] text-white text-3xl">Delivery</h2>
          </div>

          <div className="flex items-center gap-4">
            <Button 
              onClick={handleValidate}
              className="bg-[#00d9a3] hover:bg-[#00c794] text-[#1e3338] h-10 px-6 rounded-[10px] font-['Arimo',sans-serif]"
            >
              Validate
            </Button>
            <Button 
              className="bg-transparent border border-[#3a5a62] text-[#b4cdd4] hover:bg-[#1e3338] h-10 px-6 rounded-[10px] font-['Arimo',sans-serif]"
            >
              Print
            </Button>
            <Button 
              onClick={onCancel}
              className="bg-transparent border border-[#3a5a62] text-red-400 hover:bg-[#1e3338] h-10 px-6 rounded-[10px] font-['Arimo',sans-serif]"
            >
              Cancel
            </Button>
          </div>
        </div>

        {/* Status Progress */}
        <div className="bg-[#1e3338] border border-[#3a5a62] rounded-[14px] p-4 mb-6">
          <div className="flex items-center gap-2 text-base font-['Arimo',sans-serif]">
            <span className="text-[#00d9a3]">Draft</span>
            <span className="text-[#6b8690]">&gt;</span>
            <span className="text-[#6b8690]">Waiting</span>
            <span className="text-[#6b8690]">&gt;</span>
            <span className="text-[#6b8690]">Ready</span>
            <span className="text-[#6b8690]">&gt;</span>
            <span className="text-[#6b8690]">Done</span>
          </div>
        </div>

        {/* Main Form Container */}
        <div className="bg-[#1e3338] border border-[#3a5a62] rounded-2xl p-8 mb-6">
          {/* Reference Number */}
          <h3 className="font-['Arimo',sans-serif] text-red-400 text-2xl mb-6">WH/OUT/0001</h3>

          {/* Form Grid */}
          <div className="grid grid-cols-2 gap-6 mb-6">
            <div>
              <Label htmlFor="deliveryAddress" className="font-['Arimo',sans-serif] text-red-400 text-base mb-2 block">
                Delivery Address
              </Label>
              <Input
                id="deliveryAddress"
                value={formData.deliveryAddress}
                onChange={(e) => setFormData({ ...formData, deliveryAddress: e.target.value })}
                placeholder="Enter delivery address"
                className="bg-transparent border-0 border-b-2 border-red-400 text-white placeholder:text-[#6b8690] focus:ring-0 focus:border-red-400 h-10 rounded-none font-['Arimo',sans-serif]"
              />
            </div>

            <div>
              <Label htmlFor="scheduleDate" className="font-['Arimo',sans-serif] text-red-400 text-base mb-2 block">
                Schedule Date
              </Label>
              <Input
                id="scheduleDate"
                type="date"
                value={formData.scheduleDate}
                onChange={(e) => setFormData({ ...formData, scheduleDate: e.target.value })}
                className="bg-transparent border-0 border-b-2 border-red-400 text-white focus:ring-0 focus:border-red-400 h-10 rounded-none font-['Arimo',sans-serif]"
              />
            </div>

            <div>
              <Label htmlFor="responsible" className="font-['Arimo',sans-serif] text-red-400 text-base mb-2 block">
                Responsible
              </Label>
              <Input
                id="responsible"
                value={formData.responsible}
                onChange={(e) => setFormData({ ...formData, responsible: e.target.value })}
                placeholder="Enter responsible person"
                className="bg-transparent border-0 border-b-2 border-red-400 text-white placeholder:text-[#6b8690] focus:ring-0 focus:border-red-400 h-10 rounded-none font-['Arimo',sans-serif]"
              />
            </div>

            <div>
              <Label htmlFor="operationType" className="font-['Arimo',sans-serif] text-red-400 text-base mb-2 block">
                Operation type
              </Label>
              <select
                id="operationType"
                value={formData.operationType}
                onChange={(e) => setFormData({ ...formData, operationType: e.target.value })}
                className="w-full bg-transparent border-0 border-b-2 border-red-400 text-white focus:ring-0 focus:border-red-400 h-10 rounded-none font-['Arimo',sans-serif]"
              >
                <option value="" className="bg-[#2c4b52]">Select type</option>
                <option value="standard" className="bg-[#2c4b52]">Standard Delivery</option>
                <option value="express" className="bg-[#2c4b52]">Express Delivery</option>
                <option value="bulk" className="bg-[#2c4b52]">Bulk Delivery</option>
              </select>
            </div>
          </div>

          {/* Products Section */}
          <div className="mt-8">
            <h4 className="font-['Arimo',sans-serif] text-red-400 text-base mb-4">Products</h4>
            
            {/* Products Table */}
            <div className="bg-[#2c4b52] rounded-[10px] overflow-hidden mb-4">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-[#3a5a62]">
                    <th className="text-left p-4 font-['Arimo',sans-serif] text-[#b4cdd4] text-base font-bold">Product</th>
                    <th className="text-left p-4 font-['Arimo',sans-serif] text-[#b4cdd4] text-base font-bold">Quantity</th>
                    <th className="w-16"></th>
                  </tr>
                </thead>
                <tbody>
                  {products.map((product, index) => (
                    <tr key={index} className="border-b border-[#3a5a62]">
                      <td className="p-4 font-['Arimo',sans-serif] text-white text-base">{product.name}</td>
                      <td className="p-4 font-['Arimo',sans-serif] text-white text-base">{product.quantity}</td>
                      <td className="p-4">
                        <button
                          onClick={() => handleRemoveProduct(index)}
                          className="text-[#6b8690] hover:text-white transition-colors"
                        >
                          <Trash2 className="w-[18px] h-[18px]" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Add New Product Button */}
            <button
              onClick={handleAddProduct}
              className="flex items-center gap-2 font-['Arimo',sans-serif] text-red-400 text-base hover:text-red-300 transition-colors"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 16 16">
                <path d="M3.33333 8H12.6667" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
                <path d="M8 3.33333V12.6667" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
              </svg>
              Add New product
            </button>
          </div>
        </div>

        {/* Status Information */}
        <div className="bg-[#1e3338] border border-[#3a5a62] rounded-2xl p-6">
          <h4 className="font-['Arimo',sans-serif] text-red-400 text-base mb-4">Status Information</h4>
          
          <div className="space-y-4">
            <div>
              <p className="font-['Arimo',sans-serif] text-[#00d9a3] text-base mb-1">Draft: Initial state</p>
              <p className="font-['Arimo',sans-serif] text-[#8ba6ac] text-base">The delivery order has been created but not yet validated.</p>
            </div>

            <div>
              <p className="font-['Arimo',sans-serif] text-[orange] text-base mb-1">Waiting: Waiting for the out of stock product to be in</p>
              <p className="font-['Arimo',sans-serif] text-[#8ba6ac] text-base">Some products are out of stock and need to be replenished.</p>
            </div>

            <div>
              <p className="font-['Arimo',sans-serif] text-green-400 text-base mb-1">Ready: Ready to deliver/receive</p>
              <p className="font-['Arimo',sans-serif] text-[#8ba6ac] text-base">All products are in stock and ready for delivery.</p>
            </div>

            <div>
              <p className="font-['Arimo',sans-serif] text-[#b4cdd4] text-base mb-1">Done: Received or delivered</p>
              <p className="font-['Arimo',sans-serif] text-[#8ba6ac] text-base">The delivery has been completed successfully.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}