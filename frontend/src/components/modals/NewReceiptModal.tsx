import { useState, useEffect } from "react";
import { X, Package, Plus, Trash2 } from "lucide-react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { warehousesService, productsService } from "../../services/api";

interface NewReceiptModalProps {
  onClose: () => void;
  onSave: (data: any) => void;
}

interface ReceiptItem {
  productId: number;
  quantity: number;
  productName?: string;
}

export function NewReceiptModal({ onClose, onSave }: NewReceiptModalProps) {
  const [formData, setFormData] = useState({
    supplierName: "",
    referenceNo: "",
    warehouseId: "",
    warehouseName: "",
  });
  const [items, setItems] = useState<ReceiptItem[]>([{ productId: 0, quantity: 1, productName: "" }]);
  const [warehouses, setWarehouses] = useState<any[]>([]);
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [warehousesResponse, productsResponse] = await Promise.all([
          warehousesService.getAll(),
          productsService.getAll()
        ]);
        
        // Handle backend response structure: { status: 'success', data: [...], pagination: {...} }
        const warehousesData = (warehousesResponse as any).data || warehousesResponse;
        const productsData = (productsResponse as any).data || productsResponse;
        
        setWarehouses(Array.isArray(warehousesData) ? warehousesData : []);
        setProducts(Array.isArray(productsData) ? productsData : []);
      } catch (err) {
        console.error("Failed to load data:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const addItem = () => {
    setItems([...items, { productId: 0, quantity: 1, productName: "" }]);
  };

  const removeItem = (index: number) => {
    if (items.length > 1) {
      setItems(items.filter((_, i) => i !== index));
    }
  };

  const updateItem = (index: number, field: keyof ReceiptItem, value: any) => {
    const newItems = [...items];
    if (field === 'productName') {
      // When typing product name, find matching product
      newItems[index] = { ...newItems[index], productName: value };
      const matchedProduct = products.find(p => 
        `${p.name} - ${p.sku}`.toLowerCase().includes(value.toLowerCase()) ||
        p.id.toString() === value
      );
      if (matchedProduct) {
        newItems[index].productId = matchedProduct.id;
      }
    } else if (field === 'quantity') {
      newItems[index] = { ...newItems[index], quantity: Number(value) };
    }
    setItems(newItems);
  };

  const handleWarehouseChange = (value: string) => {
    setFormData({ ...formData, warehouseName: value });
    // Find matching warehouse
    const matchedWarehouse = warehouses.find(wh => 
      `${wh.name} (${wh.code})`.toLowerCase().includes(value.toLowerCase()) ||
      wh.id.toString() === value
    );
    if (matchedWarehouse) {
      setFormData({ ...formData, warehouseId: matchedWarehouse.id.toString(), warehouseName: value });
    } else {
      setFormData({ ...formData, warehouseName: value });
    }
  };

  const handleSubmit = () => {
    if (!formData.supplierName || !formData.warehouseId) {
      alert("Please fill in supplier name and select a warehouse");
      return;
    }

    const validItems = items.filter(item => item.productId > 0 && item.quantity > 0);
    if (validItems.length === 0) {
      alert("Please add at least one item with a valid product and quantity");
      return;
    }

    const payload = {
      supplierName: formData.supplierName,
      referenceNo: formData.referenceNo || undefined,
      warehouseId: Number(formData.warehouseId),
      items: validItems
    };

    onSave(payload);
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-[#1e3338] rounded-2xl border border-[#3a5a62] p-8 max-w-3xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="bg-[#2c4b52] rounded-lg size-10 flex items-center justify-center">
              <Package className="w-6 h-6 text-[#00d9a3]" />
            </div>
            <h2 className="font-['Arimo',sans-serif] text-white text-2xl">Add New Receipt</h2>
          </div>
          <button
            onClick={onClose}
            className="text-[#b4cdd4] hover:text-white transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {loading ? (
          <div className="text-white text-center py-8">Loading...</div>
        ) : (
          <>
            {/* Form */}
            <div className="space-y-4 mb-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="supplier" className="font-['Arimo',sans-serif] text-[#b4cdd4] text-base mb-2 block">
                    Supplier Name *
                  </Label>
                  <Input
                    id="supplier"
                    value={formData.supplierName}
                    onChange={(e) => setFormData({ ...formData, supplierName: e.target.value })}
                    placeholder="Enter supplier name"
                    className="bg-[#2c4b52] border-[#3a5a62] text-white placeholder:text-[#6b8690] focus:ring-[#00d9a3] focus:border-[#00d9a3] h-12 rounded-lg font-['Arimo',sans-serif]"
                  />
                </div>

                <div>
                  <Label htmlFor="warehouse" className="font-['Arimo',sans-serif] text-[#b4cdd4] text-base mb-2 block">
                    Warehouse *
                  </Label>
                  <Input
                    id="warehouse"
                    list="warehouse-list"
                    value={formData.warehouseName}
                    onChange={(e) => handleWarehouseChange(e.target.value)}
                    placeholder="Type warehouse name"
                    className="bg-[#2c4b52] border-[#3a5a62] text-white placeholder:text-[#6b8690] focus:ring-[#00d9a3] focus:border-[#00d9a3] h-12 rounded-lg font-['Arimo',sans-serif]"
                  />
                  <datalist id="warehouse-list">
                    {warehouses.map((wh) => (
                      <option key={wh.id} value={`${wh.name} (${wh.code})`} />
                    ))}
                  </datalist>
                </div>
              </div>

              <div>
                <Label htmlFor="referenceNo" className="font-['Arimo',sans-serif] text-[#b4cdd4] text-base mb-2 block">
                  Reference Number (Optional)
                </Label>
                <Input
                  id="referenceNo"
                  value={formData.referenceNo}
                  onChange={(e) => setFormData({ ...formData, referenceNo: e.target.value })}
                  placeholder="Enter reference number"
                  className="bg-[#2c4b52] border-[#3a5a62] text-white placeholder:text-[#6b8690] focus:ring-[#00d9a3] focus:border-[#00d9a3] h-12 rounded-lg font-['Arimo',sans-serif]"
                />
              </div>
            </div>

            {/* Items Section */}
            <div className="mb-6">
              <div className="flex items-center justify-between mb-4">
                <Label className="font-['Arimo',sans-serif] text-[#b4cdd4] text-base">
                  Items *
                </Label>
                <Button
                  onClick={addItem}
                  className="bg-[#00d9a3] hover:bg-[#00c794] text-[#1e3338] h-9 px-4 rounded-lg font-['Arimo',sans-serif] text-sm"
                >
                  <Plus className="w-4 h-4 mr-1" />
                  Add Item
                </Button>
              </div>

              <div className="space-y-3">
                {items.map((item, index) => (
                  <div key={index} className="flex gap-3 items-end">
                    <div className="flex-1">
                      <Label className="font-['Arimo',sans-serif] text-[#b4cdd4] text-sm mb-1 block">
                        Product
                      </Label>
                      <Input
                        list={`product-list-${index}`}
                        value={item.productName || ""}
                        onChange={(e) => updateItem(index, 'productName', e.target.value)}
                        placeholder="Type product name"
                        className="bg-[#2c4b52] border-[#3a5a62] text-white placeholder:text-[#6b8690] focus:ring-[#00d9a3] focus:border-[#00d9a3] h-10 rounded-lg font-['Arimo',sans-serif] text-sm"
                      />
                      <datalist id={`product-list-${index}`}>
                        {products.map((prod) => (
                          <option key={prod.id} value={`${prod.name} - ${prod.sku}`} />
                        ))}
                      </datalist>
                    </div>

                    <div className="w-32">
                      <Label className="font-['Arimo',sans-serif] text-[#b4cdd4] text-sm mb-1 block">
                        Quantity
                      </Label>
                      <Input
                        type="number"
                        min="1"
                        value={item.quantity}
                        onChange={(e) => updateItem(index, 'quantity', e.target.value)}
                        className="bg-[#2c4b52] border-[#3a5a62] text-white focus:ring-[#00d9a3] focus:border-[#00d9a3] h-10 rounded-lg font-['Arimo',sans-serif] text-sm"
                      />
                    </div>

                    {items.length > 1 && (
                      <Button
                        onClick={() => removeItem(index)}
                        variant="outline"
                        className="h-10 w-10 p-0 border-[#ff6b6b] text-[#ff6b6b] hover:bg-[#ff6b6b]/10"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    )}
                  </div>
                ))}
              </div>
            </div>

            <div className="flex gap-4 pt-4 border-t border-[#3a5a62]">
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
                Save Receipt
              </Button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
