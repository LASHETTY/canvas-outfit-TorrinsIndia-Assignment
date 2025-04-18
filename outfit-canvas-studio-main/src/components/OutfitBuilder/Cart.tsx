
import { FC } from 'react';
import { useCart } from './CartContext';
import { Button } from '@/components/ui/button';
import { ShoppingCart, X } from 'lucide-react';

interface CartProps {
  isOpen: boolean;
  onClose: () => void;
}

export const Cart: FC<CartProps> = ({ isOpen, onClose }) => {
  const { cartItems, clearCart } = useCart();
  
  const totalPrice = cartItems.reduce((sum, item) => sum + item.totalPrice, 0);
  
  if (!isOpen) return null;
  
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
      <div className="bg-white rounded-lg p-6 max-w-md w-full max-h-[90vh] overflow-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold flex items-center">
            <ShoppingCart className="mr-2" /> 
            Your Cart
          </h2>
          <button 
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <X />
          </button>
        </div>
        
        {cartItems.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            Your cart is empty
          </div>
        ) : (
          <>
            <div className="space-y-4 mb-4">
              {cartItems.map((cartItem) => (
                <div 
                  key={cartItem.id}
                  className="border rounded-md p-3"
                >
                  <div className="flex justify-between mb-2">
                    <span className="font-medium">Outfit #{cartItem.id.split('-')[1]}</span>
                    <span>${cartItem.totalPrice.toFixed(2)}</span>
                  </div>
                  <div className="text-sm text-gray-500">
                    {cartItem.items.length} items • Added {cartItem.createdAt.toLocaleTimeString()}
                  </div>
                </div>
              ))}
            </div>
            
            <div className="border-t pt-4 mt-4">
              <div className="flex justify-between font-bold mb-4">
                <span>Total:</span>
                <span>${totalPrice.toFixed(2)}</span>
              </div>
              
              <div className="flex gap-2">
                <Button 
                  className="flex-1"
                  onClick={clearCart}
                  variant="outline"
                >
                  Clear Cart
                </Button>
                
                <Button 
                  className="flex-1 bg-outfit-purple hover:bg-outfit-purple/90"
                >
                  Checkout
                </Button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};
