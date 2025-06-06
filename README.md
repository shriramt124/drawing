# Rough.js Drawing App

![Rough.js Drawing App](https://img.shields.io/badge/App-Drawing-blue) ![React](https://img.shields.io/badge/React-18-blue) ![Redux](https://img.shields.io/badge/Redux-Toolkit-purple) ![Rough.js](https://img.shields.io/badge/Rough.js-Latest-orange) ![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3-38B2AC)

A modern, responsive drawing application built with React and Rough.js that allows you to create sketchy, hand-drawn style graphics. Perfect for quick sketches, wireframes, or creative doodling.

## ✨ Features

- **Multiple Drawing Tools**: Pencil, Line, Rectangle, and Circle tools
- **Color Customization**: Choose from a predefined color palette or pick custom colors
- **Style Options**: Adjust stroke width and fill colors
- **Canvas Operations**: Undo, Redo, and Clear canvas
- **Export Functionality**: Save your creations as images
- **Responsive Design**: Works on both desktop and mobile devices
- **Touch Support**: Draw using touch on mobile devices

## 🖥️ Screenshots

*[Add screenshots of your application here]*

## 🚀 Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or pnpm

### Installation

1. Clone the repository
   ```bash
   git clone https://github.com/yourusername/rough-js-drawing-app.git
   cd rough-js-drawing-app
   ```

2. Install dependencies
   ```bash
   npm install
   # or if using pnpm
   pnpm install
   ```

3. Start the development server
   ```bash
   npm run dev
   # or
   pnpm run dev
   ```

4. Open your browser and navigate to `http://localhost:5173`

## 🎮 How to Use

1. **Select a Tool**: Click on one of the drawing tools in the toolbar (Pencil, Line, Rectangle, Circle)
2. **Choose Colors**: Select stroke and fill colors from the color picker panel
3. **Adjust Stroke Width**: Use the slider to change the thickness of lines
4. **Draw on Canvas**: Click and drag on the canvas to create your drawing
5. **Edit Your Work**: Use Undo/Redo buttons to correct mistakes
6. **Save Your Creation**: Click the Export button to save your drawing as an image

## 🛠️ Tech Stack

- **React**: UI library for building the interface
- **Redux Toolkit**: State management for drawing operations
- **Rough.js**: Library for creating hand-drawn, sketchy graphics
- **TailwindCSS**: Utility-first CSS framework for styling
- **Vite**: Fast build tool and development server
- **UUID**: For generating unique IDs for drawing elements

## 📁 Project Structure

```
├── src/
│   ├── components/
│   │   ├── Canvas.jsx       # Drawing canvas component
│   │   ├── ColorPicker.jsx  # Color and style selection
│   │   └── ToolBar.jsx      # Drawing tools and actions
│   ├── redux/
│   │   ├── drawingSlice.js  # Redux slice for drawing state
│   │   └── store.js         # Redux store configuration
│   ├── utils/
│   │   └── exportUtils.js   # Utilities for exporting drawings
│   ├── App.jsx              # Main application component
│   └── main.jsx             # Application entry point
├── public/                  # Static assets
└── index.html               # HTML template
```

## 🔧 Available Scripts

- `npm install` or `pnpm install` - Install dependencies
- `npm run dev` or `pnpm run dev` - Start development server
- `npm run build` or `pnpm run build` - Build for production
- `npm run preview` or `pnpm run preview` - Preview production build

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgements

- [Rough.js](https://roughjs.com/) for the sketchy rendering
- [React](https://reactjs.org/) for the UI framework
- [Redux Toolkit](https://redux-toolkit.js.org/) for state management
- [TailwindCSS](https://tailwindcss.com/) for styling