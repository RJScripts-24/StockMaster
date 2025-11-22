import { AddProductModal } from "./AddProductModal";

interface EditProductModalProps {
  isOpen: boolean;
  onClose: () => void;
  product: any;
  onEditProduct: (product: any) => void;
}

export function EditProductModal({ isOpen, onClose, product, onEditProduct }: EditProductModalProps) {
  return (
    <AddProductModal
      isOpen={isOpen}
      onClose={onClose}
      product={product}
      onAddProduct={onEditProduct}
    />
  );
}
