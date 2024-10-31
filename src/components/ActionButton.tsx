import React from 'react';
import { Loader2 } from 'lucide-react';

interface ActionButtonProps {
  onClick: () => Promise<void>;
  isLoading: boolean;
  icon: string;
  text: string;
}

const ActionButton: React.FC<ActionButtonProps> = ({ onClick, isLoading, icon, text }) => {
  return (
    <button
      onClick={onClick}
      disabled={isLoading}
      className={`
        relative w-48 h-48 bg-gray-800 rounded-lg
        border-2 border-purple-500 hover:border-purple-400
        transition-all duration-300 ease-in-out
        ${isLoading ? 'opacity-75 cursor-not-allowed' : 'hover:transform hover:scale-105'}
      `}
    >
      <div className="flex flex-col items-center justify-center h-full gap-4">
        {isLoading ? (
          <Loader2 className="w-12 h-12 animate-spin text-purple-500" />
        ) : (
          <>
            <img src={icon} alt={text} className="w-16 h-16 object-contain" />
            <span className="text-lg font-bold text-white">{text}</span>
          </>
        )}
      </div>
    </button>
  );
};

export default ActionButton;