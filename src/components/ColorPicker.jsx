import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setStrokeColor, setFillColor, setStrokeWidth } from '../redux/drawingSlice';

const ColorPicker = () => {
  // Get current colors and stroke width from Redux
  const { strokeColor, fillColor, strokeWidth } = useSelector(state => state.drawing);
  const dispatch = useDispatch();

  // Predefined color palette
  const colorPalette = [
    '#000000', // Black
    '#ffffff', // White
    '#ff0000', // Red
    '#00ff00', // Green
    '#0000ff', // Blue
    '#ffff00', // Yellow
    '#ff00ff', // Magenta
    '#00ffff', // Cyan
    '#ff8000', // Orange
    '#8000ff', // Purple
  ];

  // Stroke width options
  const strokeWidthOptions = [1, 2, 3, 5, 8];

  return (
    <div className="bg-gradient-to-b from-gray-100 to-gray-200 p-3 md:p-4 flex flex-col space-y-4 h-full">
      <h2 className="text-sm md:text-base font-semibold text-gray-700 pb-2 border-b border-gray-300">Color & Style</h2>

      {/* Stroke color selection */}
      <div className="animate-fadeIn">
        <label className="block text-xs md:text-sm font-medium text-gray-700 mb-2">Stroke Color</label>
        <div className="flex flex-wrap gap-1.5 md:gap-2">
          {colorPalette.map((color) => (
            <button
              key={`stroke-${color}`}
              className={`w-5 h-5 md:w-6 md:h-6 rounded-full border transform transition-all duration-200 hover:scale-110 ${strokeColor === color
                ? 'border-gray-800 shadow-md ring-2 ring-blue-400 ring-opacity-50 scale-110'
                : 'border-gray-300 hover:border-gray-400 hover:shadow-sm'}`}
              style={{ backgroundColor: color }}
              onClick={() => dispatch(setStrokeColor(color))}
              title={color}
              aria-label={`Set stroke color to ${color}`}
            />
          ))}
          <input
            type="color"
            value={strokeColor}
            onChange={(e) => dispatch(setStrokeColor(e.target.value))}
            className="w-5 h-5 md:w-6 md:h-6 cursor-pointer rounded-full overflow-hidden transform transition-all duration-200 hover:scale-110"
            title="Custom Stroke Color"
            aria-label="Choose custom stroke color"
          />
        </div>
      </div>

      {/* Fill color selection */}
      <div className="animate-fadeIn">
        <label className="block text-xs md:text-sm font-medium text-gray-700 mb-2">Fill Color</label>
        <div className="flex flex-wrap gap-1.5 md:gap-2">
          <button
            className={`w-5 h-5 md:w-6 md:h-6 rounded-full border transform transition-all duration-200 hover:scale-110 ${fillColor === 'transparent'
              ? 'border-gray-800 shadow-md ring-2 ring-blue-400 ring-opacity-50 scale-110'
              : 'border-gray-300 hover:border-gray-400 hover:shadow-sm'}`}
            style={{ backgroundImage: 'linear-gradient(45deg, #ccc 25%, transparent 25%, transparent 75%, #ccc 75%, #ccc), linear-gradient(45deg, #ccc 25%, transparent 25%, transparent 75%, #ccc 75%, #ccc)', backgroundSize: '6px 6px', backgroundPosition: '0 0, 3px 3px' }}
            onClick={() => dispatch(setFillColor('transparent'))}
            title="No Fill"
            aria-label="Set fill to transparent"
          />
          {colorPalette.map((color) => (
            <button
              key={`fill-${color}`}
              className={`w-5 h-5 md:w-6 md:h-6 rounded-full border transform transition-all duration-200 hover:scale-110 ${fillColor === color
                ? 'border-gray-800 shadow-md ring-2 ring-blue-400 ring-opacity-50 scale-110'
                : 'border-gray-300 hover:border-gray-400 hover:shadow-sm'}`}
              style={{ backgroundColor: color }}
              onClick={() => dispatch(setFillColor(color))}
              title={color}
              aria-label={`Set fill color to ${color}`}
            />
          ))}
          <input
            type="color"
            value={fillColor === 'transparent' ? '#ffffff' : fillColor}
            onChange={(e) => dispatch(setFillColor(e.target.value))}
            className="w-5 h-5 md:w-6 md:h-6 cursor-pointer rounded-full overflow-hidden transform transition-all duration-200 hover:scale-110"
            title="Custom Fill Color"
            aria-label="Choose custom fill color"
          />
        </div>
      </div>

      {/* Stroke width selection */}
      <div className="animate-fadeIn">
        <label className="block text-xs md:text-sm font-medium text-gray-700 mb-2">Stroke Width</label>
        <div className="flex items-center gap-2">
          <input
            type="range"
            min="1"
            max="10"
            value={strokeWidth}
            onChange={(e) => dispatch(setStrokeWidth(Number(e.target.value)))}
            className="w-full md:w-32 h-2 bg-gray-300 rounded-lg appearance-none cursor-pointer accent-blue-600"
            aria-label="Adjust stroke width"
          />
          <span className="text-xs md:text-sm bg-white px-2 py-1 rounded-md shadow-sm border border-gray-200 min-w-[40px] text-center">{strokeWidth}px</span>
        </div>
        <div className="flex justify-between mt-1 px-1">
          {strokeWidthOptions.map(width => (
            <button
              key={`width-${width}`}
              className={`w-4 h-4 md:w-5 md:h-5 rounded-full flex items-center justify-center ${strokeWidth === width ? 'bg-blue-100 text-blue-700' : 'text-gray-500 hover:bg-gray-100'} transition-colors duration-200`}
              onClick={() => dispatch(setStrokeWidth(width))}
              title={`${width}px`}
              aria-label={`Set stroke width to ${width}px`}
            >
              <div className="rounded-full bg-current" style={{ width: `${width}px`, height: `${width}px` }}></div>
            </button>
          ))}
        </div>
      </div>

      <div className="mt-auto pt-4 text-center">
        <p className="text-xs text-gray-500 italic">Tip: Use keyboard shortcuts<br />Ctrl+Z (Undo) | Ctrl+Y (Redo)</p>
      </div>
    </div>
  );
};

export default ColorPicker;