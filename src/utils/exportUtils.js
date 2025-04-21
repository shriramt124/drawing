/**
 * exportUtils.js - Utility functions for exporting canvas drawings as images
 * Provides functionality to export canvas content in different formats
 */

/**
 * Export canvas as an image file with the specified format
 * @param {HTMLCanvasElement} canvas - The canvas element to export
 * @param {string} format - The image format (png, jpeg, webp)
 * @param {string} fileName - Name for the downloaded file (without extension)
 * @param {number} quality - Image quality (0-1) for jpeg and webp formats
 */
export const exportCanvasAsImage = (canvas, format = 'png', fileName = 'drawing', quality = 0.9) => {
  // Validate input parameters
  if (!canvas || !(canvas instanceof HTMLCanvasElement)) {
    console.error('Invalid canvas element provided for export');
    return;
  }
  
  // Set mime type based on format
  const mimeTypes = {
    'png': 'image/png',
    'jpeg': 'image/jpeg',
    'jpg': 'image/jpeg',
    'webp': 'image/webp'
  };
  
  const mimeType = mimeTypes[format.toLowerCase()] || 'image/png';
  
  try {
    // Create data URL from canvas with specified format and quality
    const dataURL = canvas.toDataURL(mimeType, quality);
    
    // Create a temporary link element to trigger download
    const link = document.createElement('a');
    link.download = `${fileName}.${format.toLowerCase()}`;
    link.href = dataURL;
    link.classList.add('hidden');
    document.body.appendChild(link);
    
    // Trigger download
    link.click();
    
    // Clean up
    setTimeout(() => {
      document.body.removeChild(link);
      URL.revokeObjectURL(dataURL);
    }, 100);
    
    return true;
  } catch (error) {
    console.error('Error exporting canvas as image:', error);
    return false;
  }
};

/**
 * Open export dialog to select format and quality before exporting
 * @param {HTMLCanvasElement} canvas - The canvas element to export
 * @returns {Promise<void>}
 */
export const openExportDialog = (canvas) => {
  // Get current timestamp for default filename
  const timestamp = new Date().toISOString().replace(/[:.]/g, '-').substring(0, 19);
  const defaultFileName = `drawing-${timestamp}`;
  
  // Custom dialog using browser's built-in prompt (could be replaced with a nicer modal)
  const fileName = prompt('Enter file name (without extension):', defaultFileName);
  
  if (fileName === null) return; // User cancelled the dialog
  
  const format = prompt('Choose format (png, jpeg, webp):', 'png');
  
  if (format === null) return; // User cancelled the dialog
  
  // Only ask for quality for jpeg and webp
  let quality = 0.9;
  if (format.toLowerCase() === 'jpeg' || format.toLowerCase() === 'webp') {
    const qualityInput = prompt('Enter quality (0.1-1.0):', '0.9');
    if (qualityInput === null) return; // User cancelled the dialog
    quality = parseFloat(qualityInput);
    
    // Validate quality
    if (isNaN(quality) || quality < 0.1 || quality > 1.0) {
      alert('Invalid quality value. Using default quality (0.9).');
      quality = 0.9;
    }
  }
  
  // Export with the provided parameters
  exportCanvasAsImage(canvas, format, fileName, quality);
};