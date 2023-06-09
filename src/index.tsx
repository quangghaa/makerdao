import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { MetaMaskProvider } from "metamask-react";
import { Provider } from 'react-redux';
import { store } from './redux/store';
import { WagmiConfig, createClient } from 'wagmi'
import { getDefaultProvider } from 'ethers';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

const client = createClient({
  autoConnect: true,
  provider: getDefaultProvider(),
})

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <WagmiConfig client={client}>
        <App />
      </WagmiConfig>
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
