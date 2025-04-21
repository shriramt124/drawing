import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setTool, clearCanvas, undo, redo } from '../redux/drawingSlice';
import { openExportDialog } from '../utils/exportUtils';

const ToolBar = () => {
  // Get current tool from Redux
  const { currentTool } = useSelector(state => state.drawing);
  const dispatch = useDispatch();

  // Tool options
  const tools = [
    { id: 'pencil', label: 'Pencil', icon: '✏️' },
    { id: 'line', label: 'Line', icon: '/' },
    { id: 'rectangle', label: 'Rectangle', icon: '□' },
    { id: 'circle', label: 'Circle', icon: '○' },
  ];

  return (
    <div className="bg-gradient-to-r from-gray-800 to-gray-900 text-white p-2 md:p-4 shadow-md">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
        {/* Tool selection */}
        <div className="flex flex-wrap gap-1 md:gap-2">
          <span className="hidden sm:inline text-xs md:text-sm font-medium text-gray-300 self-center mr-1">Tools:</span>
          {tools.map((tool) => (
            <button
              key={tool.id}
              className={`p-1.5 md:p-2 rounded-md ${currentTool === tool.id
                ? 'bg-blue-600 shadow-lg ring-2 ring-blue-400 ring-opacity-50'
                : 'bg-gray-700 hover:bg-gray-600 hover:shadow-md'} 
                transition-all duration-200 ease-in-out`}
              onClick={() => dispatch(setTool(tool.id))}
              title={tool.label}
              aria-label={tool.label}
            >
              <span className="text-base md:text-xl">{tool.icon}</span>
              <span className="sr-only">{tool.label}</span>
            </button>
          ))}
        </div>

        {/* Action buttons */}
        <div className="flex flex-wrap gap-1 md:gap-2">
          <button
            className="p-1.5 md:p-2 rounded-md bg-gray-700 hover:bg-gray-600 hover:shadow-md transition-all duration-200"
            onClick={() => dispatch(undo())}
            title="Undo"
            aria-label="Undo"
          >
            <span className="text-base md:text-xl">↩️</span>
            <span className="sr-only">Undo</span>
          </button>
          <button
            className="p-1.5 md:p-2 rounded-md bg-gray-700 hover:bg-gray-600 hover:shadow-md transition-all duration-200"
            onClick={() => dispatch(redo())}
            title="Redo"
            aria-label="Redo"
          >
            <span className="text-base md:text-xl">↪️</span>
            <span className="sr-only">Redo</span>
          </button>
          <button
            className="p-1.5 md:p-2 rounded-md bg-green-700 hover:bg-green-600 hover:shadow-md transition-all duration-200"
            onClick={() => {
              // Get canvas element and pass to export dialog
              const canvas = document.querySelector('canvas');
              if (canvas) {
                openExportDialog(canvas);
              } else {
                alert('Canvas not found.');
              }
            }}
            title="Export Image"
            aria-label="Export Image"
          >
            <span className="text-base md:text-xl">💾</span>
            <span className="sr-only">Export</span>
          </button>
          <button
            className="p-1.5 md:p-2 rounded-md bg-red-700 hover:bg-red-600 hover:shadow-md transition-all duration-200"
            onClick={() => dispatch(clearCanvas())}
            title="Clear Canvas"
            aria-label="Clear Canvas"
          >
            <span className="text-base md:text-xl">🗑️</span>
            <span className="sr-only">Clear</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ToolBar;