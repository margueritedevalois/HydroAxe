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
        relative w-36 h-36 rounded-xl overflow-hidden
        transition-all duration-300 ease-in-out group
        bg-transparent
        ${isLoading ? 'opacity-75 cursor-not-allowed' : 'hover:transform hover:scale-105'}
      `}
    >
      <div className="absolute inset-0 flex items-center justify-center">
        {!isLoading && (
          <img
            src={icon}
            alt=""
            className="w-32 h-32 object-contain"
          />
        )}
      </div>
      
      <div className="absolute inset-0 bg-black/10 group-hover:bg-black/1 transition-colors" />

      <div className="relative flex flex-col items-center justify-center h-full z-10">
        {isLoading ? (
          <Loader2 className="w-12 h-12 animate-spin text-purple-500" />
        ) : (
          <span className="text-white font-semibold text-lg mt-24">{text}</span>
        )}
      </div>
    </button>
  );
};

export default ActionButton;