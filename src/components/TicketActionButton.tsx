import React, { useState } from 'react';
import { Loader2 } from 'lucide-react';

interface TicketActionButtonProps {
  onClick: (quantity: number) => Promise<void>;
  isLoading: boolean;
  icon: string;
  price?: number;
}

const TicketActionButton: React.FC<TicketActionButtonProps> = ({ onClick, isLoading, icon, price }) => {
  const [quantity, setQuantity] = useState(1);

  const handleQuantityChange = (delta: number) => {
    setQuantity(prev => Math.min(Math.max(1, prev + delta), 10));
  };

  return (
    <div className="relative">
      <button
        onClick={() => onClick(quantity)}
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
            <Loader2 className="w-12 h-12 animate-spin text-red-500" />
          ) : (
            <span className="text-white font-semibold text-lg mt-24">Buy Tickets</span>
          )}
        </div>
      </button>

      <div className="absolute -bottom-14 left-1/2 -translate-x-1/2 flex items-center gap-4 bg-transparent backdrop-blur-sm text-white rounded-lg px-4 py-2 shadow-lg ml-7">
        <button
          onClick={() => handleQuantityChange(-1)}
          disabled={quantity <= 1}
          className="w-8 h-8 flex items-center justify-center rounded-md hover:bg-black-600/50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          <img src="https://raw.githubusercontent.com/margueritedevalois/HydroAxe/master/public/images/+.png" alt="Minus" className="w-6 h-6"/>
        </button>
        
        <span className="font-medium text-xl min-w-[30px] text-center">{quantity}</span>

        <button
          onClick={() => handleQuantityChange(1)}
          disabled={quantity >= 10}
          className="w-8 h-8 flex items-center justify-center rounded-md hover:bg-black-600/50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          <img src="https://raw.githubusercontent.com/margueritedevalois/HydroAxe/master/public/images/-.png" alt="Plus" className="w-6 h-6"/>
        </button>

        {price && (
          <div className="ml-2 pl-2 border-l border-white/20">
            <span className="font-medium">${(price * quantity).toFixed(2)}</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default TicketActionButton;
