import { useState, useEffect } from "react";
import { Search, Edit, Loader2 } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Navigation } from "./Navigation";
import { AddProductModal } from "./modals/AddProductModal";
import { productsService } from "../services/api";
import type { Product } from "../types";

interface ProductsPageProps {
  onNavigate: (page: string) => void;
}

export function ProductsPage({ onNavigate }: ProductsPageProps) {
  const [showAddProductModal, setShowAddProductModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [selectedProduct, setSelectedProduct] = useState("");
  const [quantityChange, setQuantityChange] = useState("");
  const [stockAction, setStockAction] = useState("add");
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  const [products, setProducts] = useState<Product[]>([]);

  // Fetch products on component mount
  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await productsService.getAll();
      setProducts(response.data);
    } catch (err: any) {
      setError(err.message || 'Failed to load products');
      console.error('Error fetching products:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleAddProduct = async (productData: any) => {
    try {
      if (editingProduct) {
        const updated = await productsService.update(editingProduct.id, {
          sku: productData.sku,
          name: productData.name,
          description: productData.description,
          category: productData.category,
          unitPrice: productData.unitPrice,
          reorderPoint: productData.reorderPoint
        });
        setProducts(products.map(p => p.id === editingProduct.id ? updated : p));
      } else {
        const newProduct = await productsService.create({
          sku: productData.sku,
          name: productData.name,
          description: productData.description,
          category: productData.category,
          unitPrice: productData.unitPrice,
          reorderPoint: productData.reorderPoint
        });
        setProducts([...products, newProduct]);
      }
      setShowAddProductModal(false);
      setEditingProduct(null);
    } catch (err: any) {
      alert(err.message || 'Failed to save product');
      console.error('Error saving product:', err);
    }
  };

  const handleUpdateStock = () => {
    // Note: Stock updates should be done through adjustments API
    // This is a placeholder - needs proper integration with adjustments
    if (!selectedProduct || !quantityChange) {
      alert("Please select a product and enter a quantity");
      return;
    }

    alert("Stock updates should be done through the Adjustments module");
    setSelectedProduct("");
    setQuantityChange("");
  };

  // Search/filter products
  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    product.sku.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (product.category && product.category.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  // Calculate totals
  const totalProducts = filteredProducts.length;
  const totalStockValue = filteredProducts.reduce((sum, p) => sum + (p.unitPrice * 0), 0); // Note: Need stock levels from ledger
  const totalUnitsOnHand = 0; // Note: Need to fetch from stock levels
  const freeToUse = 0; // Note: Need to fetch from stock levels

  return (
    <div className="min-h-screen bg-[#2c4b52] flex flex-col">
      <Navigation activeMenu="products" onNavigate={onNavigate} />

      <div className="flex-1 px-6 py-8">
        {/* Header Section */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <Button 
              className="bg-transparent border-2 border-[#00d9a3] text-[#00d9a3] hover:bg-[#00d9a3] hover:text-[#1e3338] h-11 px-5 rounded-[10px] font-['Arimo',sans-serif] flex items-center gap-2"
              onClick={() => setShowAddProductModal(true)}
            >
              + ADD PRODUCT
            </Button>
            <h2 className="font-['Arimo',sans-serif] text-white text-3xl">Products</h2>
          </div>

          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-[#6b8690]" />
            <Input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-11 pr-4 bg-[#1e3338] border border-[#3a5a62] text-white placeholder:text-[#6b8690] focus:ring-[#00d9a3] focus:border-[#00d9a3] h-11 rounded-[10px] font-['Arimo',sans-serif] w-80"
            />
          </div>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="w-8 h-8 text-[#00d9a3] animate-spin" />
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="bg-red-900/20 border border-red-500 rounded-lg p-4 mb-8">
            <p className="text-red-400 font-['Arimo',sans-serif]">{error}</p>
            <Button 
              onClick={fetchProducts}
              className="mt-2 bg-[#00d9a3] hover:bg-[#00c794] text-[#1e3338] h-9 px-4 rounded-lg font-['Arimo',sans-serif]"
            >
              Retry
            </Button>
          </div>
        )}

        {/* No Products State */}
        {!loading && !error && filteredProducts.length === 0 && (
          <div className="bg-[#1e3338] rounded-[20px] border border-[#3a5a62] p-12 text-center mb-8">
            <p className="text-[#b4cdd4] font-['Arimo',sans-serif] text-lg mb-4">
              {searchQuery ? 'No products found matching your search' : 'No products yet'}
            </p>
            {!searchQuery && (
              <Button 
                onClick={() => setShowAddProductModal(true)}
                className="bg-[#00d9a3] hover:bg-[#00c794] text-[#1e3338] h-11 px-6 rounded-lg font-['Arimo',sans-serif]"
              >
                Add Your First Product
              </Button>
            )}
          </div>
        )}

        {/* Products Table */}
        {!loading && !error && filteredProducts.length > 0 && (
          <div className="bg-[#1e3338] rounded-[20px] border border-[#3a5a62] overflow-hidden mb-8">
          <table className="w-full">
            <thead>
              <tr className="border-b border-[#3a5a62]">
                <th className="text-left p-5 font-['Arimo',sans-serif] text-[#00d9a3] text-base">SKU</th>
                <th className="text-left p-5 font-['Arimo',sans-serif] text-[#00d9a3] text-base">Product Name</th>
                <th className="text-left p-5 font-['Arimo',sans-serif] text-[#00d9a3] text-base">Category</th>
                <th className="text-left p-5 font-['Arimo',sans-serif] text-[#00d9a3] text-base">Unit Price</th>
                <th className="text-left p-5 font-['Arimo',sans-serif] text-[#00d9a3] text-base">Reorder Point</th>
                <th className="text-left p-5 font-['Arimo',sans-serif] text-[#00d9a3] text-base">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredProducts.map((product) => (
                <tr
                  key={product.id}
                  className="border-b border-[#3a5a62] hover:bg-[#2c4b52] transition-colors"
                >
                  <td className="p-5 font-['Arimo',sans-serif] text-[#00d9a3] text-base">{product.sku}</td>
                  <td className="p-5 font-['Arimo',sans-serif] text-white text-base">{product.name}</td>
                  <td className="p-5 font-['Arimo',sans-serif] text-white text-base">{product.category || '-'}</td>
                  <td className="p-5 font-['Arimo',sans-serif] text-white text-base">₹{product.unitPrice.toFixed(2)}</td>
                  <td className="p-5 font-['Arimo',sans-serif] text-white text-base">{product.reorderPoint || '-'}</td>
                  <td className="p-5">
                    <button 
                      className="text-[#00d9a3] hover:text-[#00c794] transition-colors"
                      onClick={() => {
                        setEditingProduct(product);
                        setShowAddProductModal(true);
                      }}
                    >
                      <Edit className="w-5 h-5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        )}

        {/* Update Stock Interface - Hidden for now, needs adjustments API */}
        {/* Stock updates should be done through the Adjustments module */}

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-[#1e3338] rounded-[20px] border border-[#3a5a62] p-8">
            <p className="font-['Arimo',sans-serif] text-[#b4cdd4] text-base mb-3">Total Products</p>
            <p className="font-['Arimo',sans-serif] text-white text-5xl">{totalProducts}</p>
          </div>
          <div className="bg-[#1e3338] rounded-[20px] border border-[#3a5a62] p-8">
            <p className="font-['Arimo',sans-serif] text-[#b4cdd4] text-base mb-3">Total Stock Value</p>
            <p className="font-['Arimo',sans-serif] text-[#00d9a3] text-5xl">₹{totalStockValue.toLocaleString()}</p>
          </div>
          <div className="bg-[#1e3338] rounded-[20px] border border-[#3a5a62] p-8">
            <p className="font-['Arimo',sans-serif] text-[#b4cdd4] text-base mb-3">Total Units On Hand</p>
            <p className="font-['Arimo',sans-serif] text-white text-5xl">{totalUnitsOnHand}</p>
          </div>
          <div className="bg-[#1e3338] rounded-[20px] border border-[#3a5a62] p-8">
            <p className="font-['Arimo',sans-serif] text-[#b4cdd4] text-base mb-3">Free to Use</p>
            <p className="font-['Arimo',sans-serif] text-[#00d9a3] text-5xl">{freeToUse}</p>
          </div>
        </div>
      </div>

      {/* Add Product Modal */}
      <AddProductModal
        isOpen={showAddProductModal}
        onClose={() => setShowAddProductModal(false)}
        product={editingProduct}
        onAddProduct={handleAddProduct}
      />
    </div>
  );
}