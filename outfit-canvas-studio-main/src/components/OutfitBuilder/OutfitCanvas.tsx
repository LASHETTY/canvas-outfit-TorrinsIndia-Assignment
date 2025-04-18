
import { FC, useState } from 'react';
import { useDrop } from 'react-dnd';
import { DraggableItem, ClothingItem } from './DraggableItem';
import { cn } from '@/lib/utils';

interface OutfitCanvasProps {
  items: ClothingItem[];
  onItemsChange: (items: ClothingItem[]) => void;
  onItemClick: (item: ClothingItem) => void;
  selectedItemId?: string;
}

export const OutfitCanvas: FC<OutfitCanvasProps> = ({
  items,
  onItemsChange,
  onItemClick,
  selectedItemId
}) => {
  const [, drop] = useDrop(() => ({
    accept: 'clothing-item',
    drop: (item: ClothingItem, monitor) => {
      const delta = monitor.getDifferenceFromInitialOffset()!;
      const existingItem = items.find(i => i.id === item.id);
      
      if (existingItem) {
        // Update existing item position
        const updatedItems = items.map(i => {
          if (i.id === item.id) {
            const x = (i.position?.x || 0) + delta.x;
            const y = (i.position?.y || 0) + delta.y;
            return { ...i, position: { x, y } };
          }
          return i;
        });
        onItemsChange(updatedItems);
      } else {
        // Add new item to canvas
        const boundingRect = monitor.getClientOffset()!;
        const canvasRect = document.getElementById('outfit-canvas')!.getBoundingClientRect();
        
        const x = boundingRect.x - canvasRect.left;
        const y = boundingRect.y - canvasRect.top;
        
        const newItem = { 
          ...item, 
          id: `${item.id}-${Date.now()}`,
          position: { x, y }, 
          scale: 1.2  // Make items slightly bigger on canvas
        };
        onItemsChange([...items, newItem]);
      }
      return undefined;
    },
  }), [items, onItemsChange]);

  return (
    <div 
      ref={drop} 
      id="outfit-canvas"
      className={cn(
        "relative w-full h-[500px] rounded-md border-2 bg-outfit-canvas",
        "flex items-center justify-center overflow-hidden"
      )}
    >
      <div className="absolute inset-0 flex items-center justify-center text-gray-300 text-lg pointer-events-none">
        {items.length === 0 && "Drag items here to create your outfit"}
      </div>
      
      {items.map((item) => (
        <DraggableItem
          key={item.id}
          item={item}
          isOnCanvas={true}
          onCanvasClick={() => onItemClick(item)}
          style={{
            left: item.position?.x || 0,
            top: item.position?.y || 0,
            zIndex: selectedItemId === item.id ? 10 : 1,
            border: selectedItemId === item.id ? '2px dashed #9b87f5' : 'none',
            borderRadius: '4px',
            padding: selectedItemId === item.id ? '2px' : '0'
          }}
        />
      ))}
    </div>
  );
};
