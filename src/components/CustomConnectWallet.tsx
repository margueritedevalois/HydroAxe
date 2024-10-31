import React from 'react';
import { ConnectWallet } from "@thirdweb-dev/react";

const CustomConnectWallet: React.FC = () => {
  return (
    <div className="relative">
      <ConnectWallet 
        theme="dark"
        btnTitle="Connect Wallet"
        className="!bg-transparent hover:!bg-transparent active:!bg-transparent focus:!bg-transparent !border-0 !shadow-none !p-0 !h-auto !min-w-0"
      >
        <div className="flex items-center justify-center">
          <img 
            src="https://raw.githubusercontent.com/margueritedevalois/HydroAxe/master/public/images/wallet.png"
            alt="Connect Wallet"
            className="w-48 h-auto object-contain hover:scale-105 transition-transform duration-300"
          />
        </div>
      </ConnectWallet>
    </div>
  );
};

export default CustomConnectWallet;