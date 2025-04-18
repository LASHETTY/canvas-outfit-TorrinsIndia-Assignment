
import { 
  Shirt,
  Briefcase, 
  Glasses, 
  Watch,
  ShoppingBag,
  CircleUserRound,
  ShirtIcon,
  BookmarkIcon,
  ShoppingCart,
  ScrollIcon
} from "lucide-react";
import { ClothingItem } from "./DraggableItem";

export const clothingItems: ClothingItem[] = [
  {
    id: "tshirt-1",
    type: "top",
    name: "Basic T-Shirt",
    icon: <Shirt className="w-16 h-16 text-black" />,
    price: 19.99
  },
  {
    id: "shirt-1",
    type: "top",
    name: "Button-Up Shirt",
    icon: <ShirtIcon className="w-16 h-16 text-blue-600" />,
    price: 29.99
  },
  {
    id: "jacket-1",
    type: "top",
    name: "Classic Jacket",
    icon: <Shirt className="w-16 h-16 text-gray-700" />,
    price: 59.99
  },
  {
    id: "pants-1",
    type: "bottom",
    name: "Jeans",
    icon: <BookmarkIcon className="w-16 h-16 text-blue-800" />,
    price: 39.99
  },
  {
    id: "pants-2",
    type: "bottom",
    name: "Chinos",
    icon: <BookmarkIcon className="w-16 h-16 text-amber-700" />,
    price: 34.99
  },
  {
    id: "shoe-1",
    type: "footwear",
    name: "Sneakers",
    icon: <ScrollIcon className="w-16 h-16 rotate-90 text-gray-900" />,
    price: 49.99
  },
  {
    id: "sandal-1",
    type: "footwear",
    name: "Sandals",
    icon: <ScrollIcon className="w-16 h-16 rotate-90 text-amber-600" />,
    price: 24.99
  },
  {
    id: "hat-1",
    type: "accessory",
    name: "Baseball Cap",
    icon: <CircleUserRound className="w-16 h-16 text-red-600" />,
    price: 19.99
  },
  {
    id: "glasses-1",
    type: "accessory",
    name: "Sunglasses",
    icon: <Glasses className="w-16 h-16 text-black" />,
    price: 29.99
  },
  {
    id: "watch-1",
    type: "accessory",
    name: "Watch",
    icon: <Watch className="w-16 h-16 text-gray-800" />,
    price: 79.99
  },
  {
    id: "bag-1",
    type: "accessory",
    name: "Briefcase",
    icon: <Briefcase className="w-16 h-16 text-brown-800" />,
    price: 89.99
  },
  {
    id: "backpack-1",
    type: "accessory",
    name: "Backpack",
    icon: <ShoppingBag className="w-16 h-16 text-green-700" />,
    price: 59.99
  },
  {
    id: "dress-1",
    type: "full",
    name: "Summer Dress",
    icon: <ShirtIcon className="w-16 h-16 text-pink-400" />,
    price: 69.99
  }
];
