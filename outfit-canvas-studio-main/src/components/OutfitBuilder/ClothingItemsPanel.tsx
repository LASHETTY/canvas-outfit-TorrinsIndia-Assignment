
import { FC } from 'react';
import { DraggableItem, ClothingItem } from './DraggableItem';

interface ClothingItemsPanelProps {
  items: ClothingItem[];
}

export const ClothingItemsPanel: FC<ClothingItemsPanelProps> = ({ items }) => {
  return (
    <div className="bg-outfit-light rounded-md p-2 border-2 h-[500px] overflow-y-auto">
      <h3 className="font-medium text-center mb-3 text-outfit-dark">Clothing Items</h3>
      <div className="grid grid-cols-2 gap-2">
        {items.map((item) => (
          <div 
            key={item.id}
            className="border rounded-md bg-white hover:bg-gray-50 transition-colors"
          >
            <DraggableItem item={item} />
            <div className="text-xs text-center pb-1">{item.name}</div>
          </div>
        ))}
      </div>
    </div>
  );
};
