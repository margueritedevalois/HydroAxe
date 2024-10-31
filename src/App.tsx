import React, { useState } from 'react';
import { ConnectWallet, useAddress, useNetworkMismatch, useNetwork, useChainId } from "@thirdweb-dev/react";
import { Ethereum } from "@thirdweb-dev/chains";
import ErrorModal from './components/ErrorModal';
import ActionButton from './components/ActionButton';

function App() {
  const [isLoading, setIsLoading] = useState(false);
  const [showError, setShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  
  const address = useAddress();
  const [, switchNetwork] = useNetwork();
  const isMismatched = useNetworkMismatch();
  const chainId = useChainId();

  const handleNetworkCheck = async (callback: () => Promise<void>) => {
    if (!address) {
      setErrorMessage("Please connect your wallet first");
      setShowError(true);
      return;
    }

    if (isMismatched || chainId !== Ethereum.chainId) {
      try {
        await switchNetwork?.(Ethereum.chainId);
      } catch (error) {
        setErrorMessage("Please switch to Ethereum network");
        setShowError(true);
        return;
      }
    }

    setIsLoading(true);
    try {
      await callback();
    } catch (error) {
      setErrorMessage("Transaction failed. Please try again.");
      setShowError(true);
    } finally {
      setIsLoading(false);
    }
  };

  const handleButton1Click = async () => {
    await handleNetworkCheck(async () => {
      // Placeholder for smart contract deposit function
      await new Promise(resolve => setTimeout(resolve, 2000));
      console.log("Deposit function will be implemented here");
    });
  };

  const handleButton2Click = async () => {
    await handleNetworkCheck(async () => {
      // Placeholder for second button action
      await new Promise(resolve => setTimeout(resolve, 2000));
      console.log("Button 2 action will be implemented here");
    });
  };

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center p-4">
      <div className="absolute top-4 right-4">
        <ConnectWallet 
          theme="dark"
          btnTitle="Connect Wallet"
        />
      </div>

      <div className="flex flex-col items-center justify-center flex-grow gap-8">
        {/* Pixel Demon Image */}
        <div className="w-64 h-64 mb-8">
          <img 
            src="logo.png"
            alt="Pixel Demon"
            className="w-full h-full object-contain pixelated"
          />
        </div>

        <div className="flex gap-6">
          <ActionButton
            onClick={handleButton1Click}
            isLoading={isLoading}
            icon="/game2.png"
            text="Deposit"
          />
          
          <ActionButton
            onClick={handleButton2Click}
            isLoading={isLoading}
            icon="/game2.png"
            text="Action 2"
          />
        </div>
      </div>

      <ErrorModal 
        isOpen={showError}
        message={errorMessage}
        onClose={() => setShowError(false)}
      />
    </div>
  );
}

export default App;