import React, { useRef, useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import rough from 'roughjs';
import { v4 as uuidv4 } from 'uuid';
import { addElement } from '../redux/drawingSlice';

// Canvas component for drawing with Rough.js
const Canvas = () => {
  // Refs
  const canvasRef = useRef(null);
  const roughCanvasRef = useRef(null);
  const canvasContainerRef = useRef(null);

  // Local state for handling drawing
  const [isDrawing, setIsDrawing] = useState(false);
  const [startPoint, setStartPoint] = useState(null);
  const [canvasReady, setCanvasReady] = useState(false);

  // Get drawing state from Redux
  const { elements, currentTool, strokeColor, strokeWidth, fillColor } = useSelector(state => state.drawing);
  const dispatch = useDispatch();

  // Initialize Rough.js canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    roughCanvasRef.current = rough.canvas(canvas);

    // Set up canvas size to match parent container
    const resizeCanvas = () => {
      const container = canvasContainerRef.current;
      if (!container) return;

      const { width, height } = container.getBoundingClientRect();
      canvas.width = width;
      canvas.height = height;
      redrawElements();
    };

    // Initial resize and setup
    resizeCanvas();
    setCanvasReady(true);

    // Add resize event listener
    const resizeObserver = new ResizeObserver(resizeCanvas);
    resizeObserver.observe(canvasContainerRef.current);
    window.addEventListener('resize', resizeCanvas);

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      if (canvasContainerRef.current) {
        resizeObserver.unobserve(canvasContainerRef.current);
      }
      resizeObserver.disconnect();
    };
  }, []);

  // Redraw all elements when they change
  useEffect(() => {
    redrawElements();
  }, [elements]);

  // Function to redraw all elements on the canvas
  const redrawElements = () => {
    const context = canvasRef.current.getContext('2d');
    const roughCanvas = roughCanvasRef.current;

    // Clear the canvas
    context.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);

    // Draw all elements
    elements.forEach(element => {
      const { type, points, options } = element;

      switch (type) {
        case 'line':
          roughCanvas.line(points[0].x, points[0].y, points[1].x, points[1].y, options);
          break;
        case 'rectangle':
          roughCanvas.rectangle(
            points[0].x,
            points[0].y,
            points[1].x - points[0].x,
            points[1].y - points[0].y,
            options
          );
          break;
        case 'circle':
          const width = points[1].x - points[0].x;
          const height = points[1].y - points[0].y;
          const radius = Math.sqrt(width * width + height * height);
          roughCanvas.circle(points[0].x, points[0].y, radius * 2, options);
          break;
        case 'pencil':
          const pathData = points.reduce((acc, point, i) => {
            if (i === 0) return `M ${point.x} ${point.y}`;
            return `${acc} L ${point.x} ${point.y}`;
          }, '');

          roughCanvas.path(pathData, options);
          break;
        default:
          break;
      }
    });
  };

  // Get coordinates relative to canvas for both mouse and touch events
  const getCoordinates = (e) => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };

    const rect = canvas.getBoundingClientRect();
    // Handle both mouse and touch events
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;

    return {
      x: clientX - rect.left,
      y: clientY - rect.top
    };
  };

  // Handle pointer down event (works for both mouse and touch)
  const handlePointerDown = (e) => {
    e.preventDefault();
    setIsDrawing(true);
    const point = getCoordinates(e);
    setStartPoint(point);

    // For pencil tool, start a new element immediately
    if (currentTool === 'pencil') {
      const newElement = {
        id: uuidv4(),
        type: 'pencil',
        points: [point],
        options: {
          stroke: strokeColor,
          strokeWidth: strokeWidth,
          roughness: 1
        }
      };
      dispatch(addElement(newElement));
    }
  };

  // Alias for mouse down event
  const handleMouseDown = handlePointerDown;

  // Handle pointer move event (works for both mouse and touch)
  const handlePointerMove = (e) => {
    e.preventDefault();
    if (!isDrawing) return;

    const currentPoint = getCoordinates(e);

    // For pencil, add points to the current path
    if (currentTool === 'pencil') {
      const lastElement = elements[elements.length - 1];
      const updatedElement = {
        ...lastElement,
        points: [...lastElement.points, currentPoint]
      };

      // Use local state to avoid excessive Redux dispatches during movement
      const updatedElements = [...elements.slice(0, elements.length - 1), updatedElement];
      const context = canvasRef.current.getContext('2d');
      context.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);

      updatedElements.forEach(element => {
        const { type, points, options } = element;
        if (type === 'pencil') {
          const pathData = points.reduce((acc, point, i) => {
            if (i === 0) return `M ${point.x} ${point.y}`;
            return `${acc} L ${point.x} ${point.y}`;
          }, '');
          roughCanvasRef.current.path(pathData, options);
        } else {
          // Handle other shapes...
        }
      });

      dispatch(addElement(updatedElement));
    } else {

      // For other tools, show preview without committing to Redux yet
      const context = canvasRef.current.getContext('2d');
      const roughCanvas = roughCanvasRef.current;

      // Clear canvas and redraw all elements
      redrawElements();

      // Draw the shape being created
      const options = {
        stroke: strokeColor,
        strokeWidth: strokeWidth,
        fill: fillColor,
        roughness: 1
      };

      switch (currentTool) {
        case 'line':
          roughCanvas.line(startPoint.x, startPoint.y, currentPoint.x, currentPoint.y, options);
          break;
        case 'rectangle':
          roughCanvas.rectangle(
            startPoint.x,
            startPoint.y,
            currentPoint.x - startPoint.x,
            currentPoint.y - startPoint.y,
            options
          );
          break;
        case 'circle':
          const width = currentPoint.x - startPoint.x;
          const height = currentPoint.y - startPoint.y;
          const radius = Math.sqrt(width * width + height * height);
          roughCanvas.circle(startPoint.x, startPoint.y, radius * 2, options);
          break;
        default:
          break;
      }
    }
  };

  // Handle pointer up event (works for both mouse and touch)
  const handlePointerUp = (e) => {
    if (!isDrawing) return;
    setIsDrawing(false);

    // Skip for pencil since we've been adding points during mouse move
    if (currentTool === 'pencil') return;

    const endPoint = getCoordinates(e);
    const options = {
      stroke: strokeColor,
      strokeWidth: strokeWidth,
      fill: fillColor,
      roughness: 1
    };

    let newElement;

    switch (currentTool) {
      case 'line':
        newElement = {
          id: uuidv4(),
          type: 'line',
          points: [startPoint, endPoint],
          options
        };
        break;
      case 'rectangle':
        newElement = {
          id: uuidv4(),
          type: 'rectangle',
          points: [startPoint, endPoint],
          options
        };
        break;
      case 'circle':
        newElement = {
          id: uuidv4(),
          type: 'circle',
          points: [startPoint, endPoint],
          options
        };
        break;
      default:
        break;
    }

    if (newElement) {
      dispatch(addElement(newElement));
    }
  };

  // Alias for mouse up event
  const handleMouseUp = handlePointerUp;

  // Handle mouse out event
  const handleMouseOut = () => {
    setIsDrawing(false);
  };

  return (
    <div ref={canvasContainerRef} className="w-full h-full">
      <canvas
        ref={canvasRef}
        className="border border-gray-300 rounded-md bg-white w-full h-full"
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerLeave={handleMouseOut}
        style={{ touchAction: 'none' }}
      />
    </div>
  );
};

export default Canvas;