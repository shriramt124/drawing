// Drawing slice for Redux Toolkit
import { createSlice } from '@reduxjs/toolkit';

// Initial state for our drawing application
const initialState = {
  elements: [], // Array to store all drawing elements
  currentTool: 'pencil', // Default tool
  strokeColor: '#000000', // Default color
  strokeWidth: 2, // Default stroke width
  fillColor: 'transparent', // Default fill color
  history: [], // Array to store history for undo/redo
  currentIndex: -1, // Current position in history
};

// Create a slice for drawing functionality
const drawingSlice = createSlice({
  name: 'drawing',
  initialState,
  reducers: {
    // Add a new element to the drawing
    addElement: (state, action) => {
      // Add the new element to the elements array
      state.elements.push(action.payload);
      
      // Update history
      state.history = [...state.history.slice(0, state.currentIndex + 1), [...state.elements]];
      state.currentIndex++;
    },
    
    // Update an existing element (e.g., when resizing)
    updateElement: (state, action) => {
      const { id, ...updatedProps } = action.payload;
      // Find the element by id and update its properties
      state.elements = state.elements.map(element => 
        element.id === id ? { ...element, ...updatedProps } : element
      );
    },
    
    // Clear the entire drawing
    clearCanvas: (state) => {
      // Clear all elements
      state.elements = [];
      
      // Update history
      state.history = [...state.history.slice(0, state.currentIndex + 1), []];
      state.currentIndex++;
    },
    
    // Remove the last element added (basic undo function)
    undo: (state) => {
      if (state.currentIndex > 0) {
        state.currentIndex--;
        state.elements = [...state.history[state.currentIndex]];
      }
    },
    
    // Redo a previously undone action
    redo: (state) => {
      if (state.currentIndex < state.history.length - 1) {
        state.currentIndex++;
        state.elements = [...state.history[state.currentIndex]];
      }
    },
    
    // Change the current drawing tool
    setTool: (state, action) => {
      state.currentTool = action.payload;
    },
    
    // Change the stroke color
    setStrokeColor: (state, action) => {
      state.strokeColor = action.payload;
    },
    
    // Change the stroke width
    setStrokeWidth: (state, action) => {
      state.strokeWidth = action.payload;
    },
    
    // Change the fill color
    setFillColor: (state, action) => {
      state.fillColor = action.payload;
    },
  },
});

// Export actions
export const { 
  addElement, 
  updateElement, 
  clearCanvas, 
  undo, 
  redo, 
  setTool, 
  setStrokeColor, 
  setStrokeWidth, 
  setFillColor 
} = drawingSlice.actions;

// Export reducer
export default drawingSlice.reducer;