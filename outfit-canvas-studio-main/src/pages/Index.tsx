
import { OutfitBuilder } from '@/components/OutfitBuilder/OutfitBuilder';
import { CartProvider } from '@/components/OutfitBuilder/CartContext';
import { CartButton } from '@/components/OutfitBuilder/CartButton';

const Index = () => {
  return (
    <CartProvider>
      <div className="min-h-screen bg-gray-100 py-10">
        <div className="container mx-auto">
          <OutfitBuilder />
          <CartButton />
        </div>
      </div>
    </CartProvider>
  );
};

export default Index;
