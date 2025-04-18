
import { FC } from 'react';
import { Button } from '@/components/ui/button';
import { ClothingItem } from './DraggableItem';
import { 
  RotateCcw, 
  Save, 
  ShoppingCart, 
  Trash2, 
  RotateCw, 
  ZoomIn, 
  ZoomOut, 
  ArrowUp, 
  ArrowDown
} from 'lucide-react';

interface OutfitControlsProps {
  selectedItem: ClothingItem | null;
  canvasItems: ClothingItem[];
  onResetCanvas: () => void;
  onSaveOutfit: () => void;
  onAddToCart: () => void;
  onRemoveItem: (item: ClothingItem) => void;
  onUpdateItem: (id: string, updates: Partial<ClothingItem>) => void;
}

export const OutfitControls: FC<OutfitControlsProps> = ({
  selectedItem,
  canvasItems,
  onResetCanvas,
  onSaveOutfit,
  onAddToCart,
  onRemoveItem,
  onUpdateItem
}) => {
  const totalPrice = canvasItems.reduce((sum, item) => sum + item.price, 0);

  const handleRotateItem = (direction: 'cw' | 'ccw') => {
    if (!selectedItem) return;
    
    const currentRotation = selectedItem.rotation || 0;
    const newRotation = direction === 'cw' ? currentRotation + 15 : currentRotation - 15;
    
    onUpdateItem(selectedItem.id, { rotation: newRotation });
  };

  const handleScaleItem = (increase: boolean) => {
    if (!selectedItem) return;
    
    const currentScale = selectedItem.scale || 1;
    const newScale = increase ? currentScale + 0.1 : currentScale - 0.1;
    
    if (newScale >= 0.5 && newScale <= 2.0) {
      onUpdateItem(selectedItem.id, { scale: newScale });
    }
  };

  const handleLayerChange = (direction: 'up' | 'down') => {
    if (!selectedItem || canvasItems.length <= 1) return;
    
    // Find the current index
    const currentIndex = canvasItems.findIndex(item => item.id === selectedItem.id);
    if (currentIndex === -1) return;
    
    // Create a new array with the selected item moved
    const newItems = [...canvasItems];
    
    if (direction === 'up' && currentIndex < canvasItems.length - 1) {
      // Move item up in layer stack (towards end of array)
      [newItems[currentIndex], newItems[currentIndex + 1]] = 
      [newItems[currentIndex + 1], newItems[currentIndex]];
    } else if (direction === 'down' && currentIndex > 0) {
      // Move item down in layer stack (towards start of array)
      [newItems[currentIndex], newItems[currentIndex - 1]] = 
      [newItems[currentIndex - 1], newItems[currentIndex]];
    }
    
    // Update all items at once
    newItems.forEach(item => {
      onUpdateItem(item.id, { ...item });
    });
  };

  return (
    <div className="mt-4 space-y-4">
      <div className="flex gap-2 items-center justify-between">
        <Button 
          variant="outline" 
          size="sm" 
          onClick={onResetCanvas}
        >
          <RotateCcw className="w-4 h-4 mr-1" />
          Reset
        </Button>
        
        <Button 
          variant="outline" 
          size="sm" 
          onClick={onSaveOutfit}
        >
          <Save className="w-4 h-4 mr-1" />
          Save Outfit
        </Button>
        
        <Button 
          onClick={onAddToCart}
          disabled={canvasItems.length === 0}
          className="bg-outfit-purple hover:bg-outfit-purple/90"
        >
          <ShoppingCart className="w-4 h-4 mr-1" />
          Add to Cart (${totalPrice.toFixed(2)})
        </Button>
      </div>
      
      {selectedItem && (
        <div className="border-t pt-3">
          <h3 className="text-sm font-medium mb-2">Selected Item: {selectedItem.name}</h3>
          <div className="flex flex-wrap gap-2">
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => handleRotateItem('ccw')}
            >
              <RotateCcw className="w-4 h-4" />
            </Button>
            
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => handleRotateItem('cw')}
            >
              <RotateCw className="w-4 h-4" />
            </Button>
            
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => handleScaleItem(false)}
            >
              <ZoomOut className="w-4 h-4" />
            </Button>
            
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => handleScaleItem(true)}
            >
              <ZoomIn className="w-4 h-4" />
            </Button>
            
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => handleLayerChange('up')}
            >
              <ArrowUp className="w-4 h-4" />
            </Button>
            
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => handleLayerChange('down')}
            >
              <ArrowDown className="w-4 h-4" />
            </Button>
            
            <Button 
              variant="outline" 
              size="sm"
              className="text-red-500 hover:text-red-700"
              onClick={() => onRemoveItem(selectedItem)}
            >
              <Trash2 className="w-4 h-4" />
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};
