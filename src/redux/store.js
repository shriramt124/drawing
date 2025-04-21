// Redux store configuration
import { configureStore } from '@reduxjs/toolkit';
import drawingReducer from './drawingSlice';

// Create and configure the Redux store with our drawing reducer
const store = configureStore({
  reducer: {
    drawing: drawingReducer,
  },
});

export default store;