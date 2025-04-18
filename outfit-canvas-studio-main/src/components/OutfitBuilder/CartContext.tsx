
import { ReactNode, createContext, useContext, useState } from "react";
import { ClothingItem } from "./DraggableItem";
import { toast } from "@/hooks/use-toast";

interface CartItem {
  id: string;
  items: ClothingItem[];
  totalPrice: number;
  createdAt: Date;
}

interface CartContextType {
  cartItems: CartItem[];
  addToCart: (items: ClothingItem[]) => void;
  clearCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  const addToCart = (items: ClothingItem[]) => {
    if (items.length === 0) return;
    
    const totalPrice = items.reduce((sum, item) => sum + item.price, 0);
    
    const newCartItem: CartItem = {
      id: `outfit-${Date.now()}`,
      items: items,
      totalPrice,
      createdAt: new Date(),
    };
    
    setCartItems([...cartItems, newCartItem]);
    
    toast({
      title: "Outfit Added to Cart",
      description: `${items.length} items added to cart - $${totalPrice.toFixed(2)}`,
    });
  };

  const clearCart = () => {
    setCartItems([]);
  };

  return (
    <CartContext.Provider value={{ cartItems, addToCart, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
