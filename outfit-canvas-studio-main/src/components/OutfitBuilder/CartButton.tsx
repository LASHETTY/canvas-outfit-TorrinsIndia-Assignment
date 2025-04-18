
import { FC, useState } from 'react';
import { Button } from '@/components/ui/button';
import { ShoppingCart } from 'lucide-react';
import { useCart } from './CartContext';
import { Cart } from './Cart';

export const CartButton: FC = () => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const { cartItems } = useCart();
  
  const itemCount = cartItems.length;
  
  return (
    <>
      <Button
        onClick={() => setIsCartOpen(true)}
        className="fixed top-4 right-4 bg-outfit-purple hover:bg-outfit-purple/90"
      >
        <ShoppingCart className="mr-1 h-5 w-5" />
        {itemCount > 0 && <span className="ml-1">{itemCount}</span>}
      </Button>
      
      <Cart isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </>
  );
};
