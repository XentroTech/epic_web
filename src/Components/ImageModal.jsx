import React, { useEffect } from 'react';
import { FiDownload, FiX } from 'react-icons/fi';

export default function ImageModal({ image, onClose }) {
  // Handle ESC key press
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [onClose]);

  // Prevent scroll when modal is open
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      <div 
        className="relative max-w-7xl w-full bg-white rounded-lg shadow-xl"
        onClick={e => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 bg-white rounded-full shadow-lg hover:bg-gray-100"
          aria-label="Close modal"
        >
          <FiX className="w-6 h-6" />
        </button>

        <div className="p-4">
          {/* Image container */}
          <div className="relative aspect-auto max-h-[80vh] overflow-hidden rounded-lg">
            <img
              src={image.url}
              alt={image.description}
              className="w-full h-full object-contain"
            />
          </div>

          {/* Image details and download button */}
          <div className="mt-4 flex items-center justify-between">
            <div>
              <h2 id="modal-title" className="text-xl font-semibold">{image.title || 'Image'}</h2>
              <p className="text-gray-600">{image.description}</p>
            </div>
            <button
              onClick={() => window.open(image.url, '_blank')}
              className="flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
            >
              <FiDownload className="w-5 h-5" />
              Download
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

