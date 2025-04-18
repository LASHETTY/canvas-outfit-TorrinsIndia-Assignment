
# Outfit Canvas Studio

A web-based WYSIWYG (What You See Is What You Get) editor that allows users to visually mix and match different clothing items by dragging and dropping individual clothing icons into a virtual canvas.

## Features

- **Drag-and-Drop Interface**: Easily drag clothing items onto the canvas
- **Visual Outfit Assembly**: Layer and position clothing items to create complete outfits
- **Item Customization**: 
  - Rotate items
  - Resize items
  - Arrange layers
- **Save Outfits**: Save your favorite combinations for later use
- **Shopping Cart**: Add complete outfits to your cart for purchase

## Prerequisites

- Node.js (v18 or later)
- npm or Bun

## Installation

1. Clone the repository
   ```bash
   git clone <your-repository-url>
   cd outfit-canvas-studio
   ```

2. Install dependencies
   ```bash
   npm install
   # or
   bun install
   ```

3. Run the development server
   ```bash
   npm run dev
   # or
   bun run dev
   ```

4. Open your browser and navigate to `http://localhost:8080`

## How to Use

1. **Browse Clothing Items**: Explore the selection panel on the left side
2. **Create Outfits**: 
   - Drag items from the panel onto the canvas
   - Customize items using available controls
3. **Customize Your Outfit**:
   - Rotate items
   - Resize items
   - Change layer order
   - Remove items
4. **Save Your Outfit**: Click "Save Outfit" to name and preserve your creation
5. **Add to Cart**: When satisfied, click "Add to Cart"
6. **Manage Cart**: Access your cart by clicking the cart icon

## Technologies Used

- React
- TypeScript
- Vite
- Tailwind CSS
- React DnD (Drag and Drop)
- Lucide React (Icons)

## Project Structure

- `src/components/OutfitBuilder`: Core application components
- `src/pages`: Application pages
- `src/components/ui`: Reusable UI components

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

Distributed under the MIT License. See `LICENSE` for more information.
