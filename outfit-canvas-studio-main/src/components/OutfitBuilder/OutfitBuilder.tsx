
import { useState } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { useToast } from '@/hooks/use-toast';
import { useCart } from './CartContext';
import { ClothingItemsPanel } from './ClothingItemsPanel';
import { OutfitCanvas } from './OutfitCanvas';
import { OutfitControls } from './OutfitControls';
import { clothingItems } from './clothingItems';
import { ClothingItem } from './DraggableItem';
import { useIsMobile } from '@/hooks/use-mobile';

export const OutfitBuilder = () => {
  const isMobile = useIsMobile();
  const { toast } = useToast();
  const { addToCart } = useCart();
  
  const [canvasItems, setCanvasItems] = useState<ClothingItem[]>([]);
  const [selectedItemId, setSelectedItemId] = useState<string | undefined>(undefined);
  const [savedOutfits, setSavedOutfits] = useState<{ name: string; items: ClothingItem[] }[]>([]);
  
  const selectedItem = canvasItems.find(item => item.id === selectedItemId) || null;
  
  const handleResetCanvas = () => {
    if (canvasItems.length === 0) return;
    
    const confirmReset = window.confirm('Are you sure you want to clear the canvas?');
    if (confirmReset) {
      setCanvasItems([]);
      setSelectedItemId(undefined);
    }
  };
  
  const handleSaveOutfit = () => {
    if (canvasItems.length === 0) {
      toast({
        title: "Cannot Save Empty Outfit",
        description: "Add some items to your outfit before saving",
        variant: "destructive",
      });
      return;
    }
    
    const outfitName = prompt('Enter a name for your outfit:');
    if (!outfitName) return;
    
    setSavedOutfits([
      ...savedOutfits, 
      { name: outfitName, items: [...canvasItems] }
    ]);
    
    toast({
      title: "Outfit Saved",
      description: `"${outfitName}" has been saved`,
    });
  };
  
  const handleAddToCart = () => {
    if (canvasItems.length === 0) {
      toast({
        title: "Cannot Add Empty Outfit to Cart",
        description: "Add some items to your outfit first",
        variant: "destructive",
      });
      return;
    }
    
    addToCart([...canvasItems]);
  };
  
  const handleItemClick = (item: ClothingItem) => {
    setSelectedItemId(item.id);
  };
  
  const handleRemoveItem = (item: ClothingItem) => {
    setCanvasItems(canvasItems.filter(i => i.id !== item.id));
    setSelectedItemId(undefined);
  };
  
  const handleUpdateItem = (id: string, updates: Partial<ClothingItem>) => {
    setCanvasItems(
      canvasItems.map(item => 
        item.id === id ? { ...item, ...updates } : item
      )
    );
  };
  
  return (
    <DndProvider backend={HTML5Backend}>
      <div className="max-w-6xl mx-auto px-4">
        <div className="bg-outfit-light rounded-lg p-6 shadow-md">
          <h1 className="text-3xl font-bold text-center mb-6 text-outfit-dark">
            Outfit Canvas Studio
          </h1>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="md:col-span-1">
              <ClothingItemsPanel items={clothingItems} />
            </div>
            
            <div className="md:col-span-3">
              <OutfitCanvas
                items={canvasItems}
                onItemsChange={setCanvasItems}
                onItemClick={handleItemClick}
                selectedItemId={selectedItemId}
              />
              
              <OutfitControls
                selectedItem={selectedItem}
                canvasItems={canvasItems}
                onResetCanvas={handleResetCanvas}
                onSaveOutfit={handleSaveOutfit}
                onAddToCart={handleAddToCart}
                onRemoveItem={handleRemoveItem}
                onUpdateItem={handleUpdateItem}
              />
            </div>
          </div>
          
          {savedOutfits.length > 0 && (
            <div className="mt-8 border-t pt-4">
              <h2 className="text-xl font-semibold mb-2">Saved Outfits</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                {savedOutfits.map((outfit, index) => (
                  <div key={index} className="border rounded-md p-3 bg-white">
                    <h3 className="font-medium">{outfit.name}</h3>
                    <div className="flex justify-between mt-2">
                      <span>{outfit.items.length} items</span>
                      <button 
                        className="text-outfit-purple text-sm"
                        onClick={() => {
                          setCanvasItems(outfit.items);
                          setSelectedItemId(undefined);
                        }}
                      >
                        Load
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </DndProvider>
  );
};
