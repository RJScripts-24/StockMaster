import { useState, useEffect } from "react";
import { Trash2, Plus } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Navigation } from "./Navigation";
import { warehousesService, productsService } from "../services/api";

interface NewDeliveryFormProps {
  onNavigate: (page: string) => void;
  onSave: (data: any) => void;
  onCancel: () => void;
}

interface DeliveryItem {
  productId: number;
  quantity: number;
  productName?: string;
}

export function NewDeliveryForm({ onNavigate, onSave, onCancel }: NewDeliveryFormProps) {
  const [formData, setFormData] = useState({
    customerName: "",
    referenceNo: "",
    warehouseId: "",
    warehouseName: "",
  });

  const [items, setItems] = useState<DeliveryItem[]>([{ productId: 0, quantity: 1, productName: "" }]);
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

  const updateItem = (index: number, field: keyof DeliveryItem, value: any) => {
    const newItems = [...items];
    if (field === 'productName') {
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

  const handleValidate = () => {
    if (!formData.customerName || !formData.warehouseId) {
      alert("Please fill in customer name and select a warehouse");
      return;
    }

    const validItems = items.filter(item => item.productId > 0 && item.quantity > 0);
    if (validItems.length === 0) {
      alert("Please add at least one item with a valid product and quantity");
      return;
    }

    const payload = {
      customerName: formData.customerName,
      referenceNo: formData.referenceNo || undefined,
      warehouseId: Number(formData.warehouseId),
      items: validItems.map(item => ({
        productId: item.productId,
        quantity: item.quantity
      }))
    };

    onSave(payload);
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
          {loading ? (
            <div className="text-white text-center py-8">Loading...</div>
          ) : (
            <>
              {/* Form Grid */}
              <div className="grid grid-cols-2 gap-6 mb-6">
                <div>
                  <Label htmlFor="customerName" className="font-['Arimo',sans-serif] text-red-400 text-base mb-2 block">
                    Customer Name *
                  </Label>
                  <Input
                    id="customerName"
                    value={formData.customerName}
                    onChange={(e) => setFormData({ ...formData, customerName: e.target.value })}
                    placeholder="Enter customer name"
                    className="bg-transparent border-0 border-b-2 border-red-400 text-white placeholder:text-[#6b8690] focus:ring-0 focus:border-red-400 h-10 rounded-none font-['Arimo',sans-serif]"
                  />
                </div>

                <div>
                  <Label htmlFor="warehouse" className="font-['Arimo',sans-serif] text-red-400 text-base mb-2 block">
                    Warehouse *
                  </Label>
                  <Input
                    id="warehouse"
                    list="warehouse-list"
                    value={formData.warehouseName}
                    onChange={(e) => handleWarehouseChange(e.target.value)}
                    placeholder="Type warehouse name"
                    className="bg-transparent border-0 border-b-2 border-red-400 text-white placeholder:text-[#6b8690] focus:ring-0 focus:border-red-400 h-10 rounded-none font-['Arimo',sans-serif]"
                  />
                  <datalist id="warehouse-list">
                    {warehouses.map((wh) => (
                      <option key={wh.id} value={`${wh.name} (${wh.code})`} />
                    ))}
                  </datalist>
                </div>

                <div>
                  <Label htmlFor="referenceNo" className="font-['Arimo',sans-serif] text-red-400 text-base mb-2 block">
                    Reference Number (Optional)
                  </Label>
                  <Input
                    id="referenceNo"
                    value={formData.referenceNo}
                    onChange={(e) => setFormData({ ...formData, referenceNo: e.target.value })}
                    placeholder="Enter reference number"
                    className="bg-transparent border-0 border-b-2 border-red-400 text-white placeholder:text-[#6b8690] focus:ring-0 focus:border-red-400 h-10 rounded-none font-['Arimo',sans-serif]"
                  />
                </div>
              </div>

              {/* Products Section */}
              <div className="mt-8">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="font-['Arimo',sans-serif] text-red-400 text-base">Products *</h4>
                  <Button
                    onClick={addItem}
                    className="bg-[#00d9a3] hover:bg-[#00c794] text-[#1e3338] h-9 px-4 rounded-lg font-['Arimo',sans-serif] text-sm"
                  >
                    <Plus className="w-4 h-4 mr-1" />
                    Add Product
                  </Button>
                </div>
                
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
                      {items.map((item, index) => (
                        <tr key={index} className="border-b border-[#3a5a62]">
                          <td className="p-4">
                            <Input
                              list={`product-list-${index}`}
                              value={item.productName || ""}
                              onChange={(e) => updateItem(index, 'productName', e.target.value)}
                              placeholder="Type product name"
                              className="bg-transparent border-0 border-b border-[#3a5a62] text-white placeholder:text-[#6b8690] focus:ring-0 focus:border-red-400 h-8 rounded-none font-['Arimo',sans-serif] text-sm"
                            />
                            <datalist id={`product-list-${index}`}>
                              {products.map((prod) => (
                                <option key={prod.id} value={`${prod.name} - ${prod.sku}`} />
                              ))}
                            </datalist>
                          </td>
                          <td className="p-4">
                            <Input
                              type="number"
                              min="1"
                              value={item.quantity}
                              onChange={(e) => updateItem(index, 'quantity', e.target.value)}
                              className="bg-transparent border-0 border-b border-[#3a5a62] text-white focus:ring-0 focus:border-red-400 h-8 rounded-none font-['Arimo',sans-serif] text-sm w-24"
                            />
                          </td>
                          <td className="p-4">
                            {items.length > 1 && (
                              <button
                                onClick={() => removeItem(index)}
                                className="text-[#6b8690] hover:text-white transition-colors"
                              >
                                <Trash2 className="w-[18px] h-[18px]" />
                              </button>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </>
          )}
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