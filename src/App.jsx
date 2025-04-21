import React, { useState } from 'react';
import { Provider } from 'react-redux';
import store from './redux/store';
import Canvas from './components/Canvas';
import ToolBar from './components/ToolBar';
import ColorPicker from './components/ColorPicker';

function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <Provider store={store}>
      <div className="flex flex-col h-screen bg-gradient-to-br from-gray-50 to-gray-100">
        {/* App header */}
        <header className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white p-3 md:p-4 shadow-lg">
          <div className="flex justify-between items-center">
            <h1 className="text-xl md:text-2xl font-bold">Rough.js Drawing App</h1>
            <button
              className="md:hidden bg-blue-500 hover:bg-blue-400 text-white p-2 rounded-full shadow-md transition-all duration-300"
              onClick={toggleSidebar}
              aria-label="Toggle color picker"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" />
              </svg>
            </button>
          </div>
        </header>

        {/* Toolbar */}
        <ToolBar />

        {/* Main content area */}
        <div className="flex flex-1 overflow-hidden relative">
          {/* Color picker sidebar - Mobile */}
          <div className={`absolute inset-y-0 left-0 z-30 w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out md:hidden ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
            <div className="h-full overflow-y-auto">
              <ColorPicker />
            </div>
          </div>

          {/* Overlay for mobile sidebar */}
          {isSidebarOpen && (
            <div
              className="fixed inset-0 bg-black bg-opacity-50 z-20 md:hidden"
              onClick={toggleSidebar}
            />
          )}

          {/* Color picker sidebar - Desktop */}
          <div className="hidden md:block w-64 border-r border-gray-200 shadow-md overflow-y-auto bg-white">
            <ColorPicker />
          </div>

          {/* Canvas area */}
          <div className="flex-1 relative">
            <div className="absolute inset-0 m-2 md:m-4 bg-white rounded-lg shadow-md overflow-hidden">
              <Canvas />
            </div>
          </div>
        </div>

        {/* App footer */}
        <footer className="bg-gradient-to-r from-gray-800 to-gray-900 text-white p-2 text-center text-xs md:text-sm">
          <p>Created with React, Redux Toolkit, and Rough.js</p>
        </footer>
      </div>
    </Provider>
  );
}

export default App;