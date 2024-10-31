import React from 'react';
import { X } from 'lucide-react';

interface ErrorModalProps {
  isOpen: boolean;
  message: string;
  onClose: () => void;
}

const ErrorModal: React.FC<ErrorModalProps> = ({ isOpen, message, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-gray-900 border border-red-500 rounded-lg p-6 max-w-sm w-full">
        <div className="flex justify-between items-start mb-4">
          <h3 className="text-xl font-bold text-red-500">Error</h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors"
          >
            <X size={24} />
          </button>
        </div>
        <p className="text-white mb-4">{message}</p>
        <button
          onClick={onClose}
          className="w-full bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded transition-colors"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default ErrorModal;