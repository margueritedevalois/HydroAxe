import React, { useState } from 'react';
import { useAddress, useNetworkMismatch, useNetwork, useChainId } from "@thirdweb-dev/react";
import { Ethereum } from "@thirdweb-dev/chains";
import ErrorModal from './components/ErrorModal';
import ActionButton from './components/ActionButton';
import TicketActionButton from './components/TicketActionButton';
import CustomConnectWallet from './components/CustomConnectWallet';

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

  const handleTicketButtonClick = async (quantity: number) => {
    await handleNetworkCheck(async () => {
      // Placeholder for ticket purchase function
      await new Promise(resolve => setTimeout(resolve, 2000));
      console.log(`Purchase ${quantity} tickets`);
    });
  };

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Background image container */}
      <div 
        className="absolute inset-0 flex items-center justify-center opacity-50"
      >
        <div 
          style={{
            width: '589px',
            height: '389px',
            backgroundImage: `url('https://raw.githubusercontent.com/margueritedevalois/HydroAxe/master/public/images/fon.png')`,
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'cover',
            marginTop: '390px'
          }}
        />
      </div>

      {/* Content container */}
      <div className="relative z-10 min-h-screen flex flex-col items-center p-4">
        <div className="absolute top-4 right-4">
          <CustomConnectWallet />
        </div>

        {/* Pixel Demon Image */}
        <div className="w-128 h-128 mb-8" style={{ marginTop: '-50px', opacity: 0.8 }}>
          <img 
            src="https://raw.githubusercontent.com/margueritedevalois/HydroAxe/master/public/images/logo.png"
            alt="Pixel Demon"
            className="w-full h-full object-contain pixelated"
          />
        </div>

        {/* Buttons container */}
        <div className="flex flex-col items-center justify-center flex-grow gap-8" style={{ marginTop: '-40px' }}>
          <div className="flex gap-8">
            <ActionButton
              onClick={handleButton1Click}
              isLoading={isLoading}
              icon="https://raw.githubusercontent.com/margueritedevalois/HydroAxe/master/public/images/game2.png"
              text="Kill Them"
            />

            <TicketActionButton
              onClick={handleTicketButtonClick}
              isLoading={isLoading}
              icon="https://raw.githubusercontent.com/margueritedevalois/HydroAxe/master/public/images/game2.png"
              price={1}
            />
          </div>
        </div>

        <ErrorModal 
          isOpen={showError}
          message={errorMessage}
          onClose={() => setShowError(false)}
        />
      </div>
    </div>
  );
}

export default App;