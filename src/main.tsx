import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { ThirdwebProvider } from "@thirdweb-dev/react";
import { Ethereum } from "@thirdweb-dev/chains";
import App from './App';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThirdwebProvider
      activeChain={Ethereum}
      clientId="your-client-id" // Replace with your thirdweb client ID
    >
      <App />
    </ThirdwebProvider>
  </StrictMode>
);