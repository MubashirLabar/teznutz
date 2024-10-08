import React, { useRef } from 'react';
import { LocomotiveScrollProvider } from 'react-locomotive-scroll';

// Views
import Home from './screens/Home';
import { TezosContextProvider } from './tezos';

// Import css
import './assets/css/App.css';
import './assets/css/responsive.css';
import './assets/css/locomoScroll.css';
import { TezosToolkit } from '@taquito/taquito';

function App() {
  const containerRef = useRef(null);
  const tezos = new TezosToolkit(' https://mainnet.smartpy.io');

  return (
    <LocomotiveScrollProvider
      options={{
        smooth: true,
        // ... all available Locomotive Scroll instance options
      }}
      watch={
        [
          //..all the dependencies you want to watch to update the scroll.
          //  Basicaly, you would want to watch page/location changes
          //  For exemple, on Next.js you would want to watch properties like `router.asPath` (you may want to add more criterias if the instance should be update on locations with query parameters)
        ]
      }
      containerRef={containerRef}
    >
      <div className='App' data-scroll-container ref={containerRef}>
        <TezosContextProvider tezos={tezos}>
          <Home />
        </TezosContextProvider>
      </div>
    </LocomotiveScrollProvider>
  );
}

export default App;
