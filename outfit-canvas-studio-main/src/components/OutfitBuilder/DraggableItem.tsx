
import { FC, useRef } from 'react';
import { useDrag } from 'react-dnd';
import { cn } from '@/lib/utils';

export interface ClothingItem {
  id: string;
  type: string;
  name: string;
  icon: JSX.Element;
  price: number;
  position?: { x: number; y: number };
  scale?: number;
  rotation?: number;
}

interface DraggableItemProps {
  item: ClothingItem;
  isOnCanvas?: boolean;
  onCanvasClick?: () => void;
  style?: React.CSSProperties;
}

export const DraggableItem: FC<DraggableItemProps> = ({ 
  item, 
  isOnCanvas = false, 
  onCanvasClick,
  style
}) => {
  const ref = useRef<HTMLDivElement>(null);
  
  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'clothing-item',
    item: { ...item },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }));

  drag(ref);

  return (
    <div
      ref={ref}
      className={cn(
        "transition-all duration-150 cursor-grab active:cursor-grabbing",
        isDragging ? "opacity-50" : "opacity-100",
        isOnCanvas ? "absolute" : "relative"
      )}
      onClick={onCanvasClick}
      style={{
        ...style,
        transform: `scale(${item.scale || 1}) rotate(${item.rotation || 0}deg)`,
      }}
    >
      <div className="flex items-center justify-center p-2">
        {item.icon}
      </div>
    </div>
  );
};
