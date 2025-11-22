import { useState, useEffect } from "react";
import { X } from "lucide-react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import type { Product } from "../../types";

interface AddProductModalProps {
  isOpen: boolean;
  onClose: () => void;
  product?: Product | null;
  onAddProduct: (product: any) => void;
}

export function AddProductModal({ isOpen, onClose, product, onAddProduct }: AddProductModalProps) {
  const [formData, setFormData] = useState({
    sku: "",
    name: "",
    description: "",
    category: "",
    unitPrice: "",
    reorderPoint: ""
  });

  useEffect(() => {
    if (product) {
      setFormData({
        sku: product.sku,
        name: product.name,
        description: product.description || "",
        category: product.category || "",
        unitPrice: product.unitPrice.toString(),
        reorderPoint: product.reorderPoint?.toString() || ""
      });
    } else {
      setFormData({
        sku: "",
        name: "",
        description: "",
        category: "",
        unitPrice: "",
        reorderPoint: ""
      });
    }
  }, [product]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const productData = {
      sku: formData.sku,
      name: formData.name,
      description: formData.description || undefined,
      category: formData.category || undefined,
      unitPrice: parseFloat(formData.unitPrice),
      reorderPoint: formData.reorderPoint ? parseInt(formData.reorderPoint) : undefined
    };
    
    onAddProduct(productData);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-[#1e3338] rounded-2xl border border-[#3a5a62] w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-[#3a5a62]">
          <h2 className="font-['Arimo',sans-serif] text-white text-2xl">
            {product ? "Edit Product" : "Add New Product"}
          </h2>
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
              <Label htmlFor="sku" className="font-['Arimo',sans-serif] text-[#00d9a3] text-base mb-2 block">
                SKU *
              </Label>
              <Input
                id="sku"
                value={formData.sku}
                onChange={(e) => setFormData({ ...formData, sku: e.target.value })}
                placeholder="e.g., DESK001"
                className="bg-[#2c4b52] border-[#3a5a62] text-white placeholder:text-[#6b8690] focus:ring-[#00d9a3] focus:border-[#00d9a3] h-11 rounded-lg font-['Arimo',sans-serif]"
                required
              />
            </div>

            <div>
              <Label htmlFor="productName" className="font-['Arimo',sans-serif] text-[#00d9a3] text-base mb-2 block">
                Product Name *
              </Label>
              <Input
                id="productName"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="e.g., Office Desk"
                className="bg-[#2c4b52] border-[#3a5a62] text-white placeholder:text-[#6b8690] focus:ring-[#00d9a3] focus:border-[#00d9a3] h-11 rounded-lg font-['Arimo',sans-serif]"
                required
              />
            </div>

            <div className="col-span-2">
              <Label htmlFor="description" className="font-['Arimo',sans-serif] text-[#00d9a3] text-base mb-2 block">
                Description
              </Label>
              <Input
                id="description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Product description..."
                className="bg-[#2c4b52] border-[#3a5a62] text-white placeholder:text-[#6b8690] focus:ring-[#00d9a3] focus:border-[#00d9a3] h-11 rounded-lg font-['Arimo',sans-serif]"
              />
            </div>

            <div>
              <Label htmlFor="category" className="font-['Arimo',sans-serif] text-[#00d9a3] text-base mb-2 block">
                Category
              </Label>
              <Input
                id="category"
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                placeholder="e.g., Furniture"
                className="bg-[#2c4b52] border-[#3a5a62] text-white placeholder:text-[#6b8690] focus:ring-[#00d9a3] focus:border-[#00d9a3] h-11 rounded-lg font-['Arimo',sans-serif]"
              />
            </div>

            <div>
              <Label htmlFor="unitPrice" className="font-['Arimo',sans-serif] text-[#00d9a3] text-base mb-2 block">
                Unit Price (₹) *
              </Label>
              <Input
                id="unitPrice"
                type="number"
                step="0.01"
                min="0"
                value={formData.unitPrice}
                onChange={(e) => setFormData({ ...formData, unitPrice: e.target.value })}
                placeholder="e.g., 3000"
                className="bg-[#2c4b52] border-[#3a5a62] text-white placeholder:text-[#6b8690] focus:ring-[#00d9a3] focus:border-[#00d9a3] h-11 rounded-lg font-['Arimo',sans-serif]"
                required
              />
            </div>

            <div>
              <Label htmlFor="reorderPoint" className="font-['Arimo',sans-serif] text-[#00d9a3] text-base mb-2 block">
                Reorder Point
              </Label>
              <Input
                id="reorderPoint"
                type="number"
                min="0"
                value={formData.reorderPoint}
                onChange={(e) => setFormData({ ...formData, reorderPoint: e.target.value })}
                placeholder="e.g., 10"
                className="bg-[#2c4b52] border-[#3a5a62] text-white placeholder:text-[#6b8690] focus:ring-[#00d9a3] focus:border-[#00d9a3] h-11 rounded-lg font-['Arimo',sans-serif]"
              />
            </div>
          </div>

          {/* Buttons */}
          <div className="flex gap-4 pt-4">
            <Button
              type="submit"
              className="flex-1 bg-[#00d9a3] hover:bg-[#00c794] text-[#1e3338] h-11 rounded-lg font-['Arimo',sans-serif]"
            >
              {product ? "Update Product" : "Add Product"}
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
