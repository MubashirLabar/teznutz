import React, { FC, useEffect, useState } from 'react';
import Loading from '../components/Loading';
import { useBeaconWallet, useContract } from '../tezos';
import { ColorMode, NetworkType } from '@airgap/beacon-sdk';

interface IWhiteList {
  handleCloseModal?: () => void;
}

enum Status {
  NOT_CONNECTED = 'none',
  CONNECTING = 'connecting',
  CONNECTED = 'connected',
  WAIT_WALLET_CONFIRMATION = 'waitWalletConfirmation',
  TRANSACTION_PENDING = 'transactionPending',
  SUCCESS = 'success',
  CONNECT_ERROR = 'connectError',
  TRANSACTION_ERROR = 'transactionError',
}

const contractAddress = 'KT1PKQD282q77UMDmC6M7ZnQPfR8LRi8p3XG';

const Whitelist: FC<IWhiteList> = ({ handleCloseModal }) => {
  const [status, setStatus] = useState<Status>(Status.NOT_CONNECTED);
  const { initialized, walletConnect, walletError, walletClearError } =
    useBeaconWallet();

  const {
    contract,
    contractConnect,
    addToWhiteList,
    walletPending,
    transactionPending,
    whiteListed,
    transactionHash,
    contractError,
    contractClearError,
  } = useContract(initialized ? contractAddress : '');

  useEffect(() => {
    if (initialized) {
      setStatus(Status.CONNECTED);
      contractConnect();
    }
  }, [initialized]);

  useEffect(() => {
    if (contract && status === Status.CONNECTING) {
      setStatus(Status.WAIT_WALLET_CONFIRMATION);
    }
  }, [walletPending]);

  useEffect(() => {
    if (contract && status === Status.WAIT_WALLET_CONFIRMATION) {
      setStatus(Status.TRANSACTION_PENDING);
    }
  }, [transactionPending]);

  useEffect(() => {
    if (walletError || contractError) {
      if (walletError) {
        setStatus(Status.CONNECT_ERROR);
        walletClearError();
      } else {
        setStatus(Status.TRANSACTION_ERROR);
        contractClearError();
      }
    }
  }, [walletError, contractError]);

  useEffect(() => {
    if (contract && status === Status.WAIT_WALLET_CONFIRMATION) {
      addToWhiteList(contract);
    }
  }, [contract]);

  useEffect(() => {
    if (whiteListed) {
      setStatus(Status.SUCCESS);
    }
  }, [whiteListed]);

  const handleSubmit = async () => {
    if (status === Status.NOT_CONNECTED) {
      setStatus(Status.CONNECTING);
      handleConnect();
    } else if (status === Status.CONNECT_ERROR) {
      setStatus(Status.CONNECTING);
      handleConnect();
    } else if (status === Status.TRANSACTION_ERROR) {
      setStatus(Status.WAIT_WALLET_CONFIRMATION);
      handleAddToWhitelist();
    } else if (status === Status.CONNECTED) {
      setStatus(Status.WAIT_WALLET_CONFIRMATION);
      handleAddToWhitelist();
    }
  };

  const handleConnect = () => {
    walletConnect(
      {
        disableDefaultEvents: true,
        name: 'TezNutz',
        preferredNetwork: NetworkType.MAINNET,
        iconUrl: 'https://teznutz.xyz/images/logo.png',
        appUrl: 'https://teznutz.xyz',
        colorMode: ColorMode.LIGHT,
      },
      NetworkType.MAINNET
    );
  };

  const handleAddToWhitelist = () => {
    contractConnect();
  };

  const notConnected = () => {
    return (
      <>
        <div className='title'>Connect to wallet</div>
        <img src={require('../assets/images/logo.png')} className='img' />
        <button className='btn' onClick={() => handleSubmit()}>
          Connect
        </button>
      </>
    );
  };

  const connectingView = () => {
    return (
      <>
        <div className='title'>Connecting to your wallet</div>
        <img src={require('../assets/images/logo.png')} className='img' />
        <div className='loading'>
          <Loading />
        </div>
      </>
    );
  };

  const connectedView = () => {
    return (
      <>
        <div className='title'>Add to whitelist</div>
        <img src={require('../assets/images/logo.png')} className='img' />
        <button className='btn' onClick={() => handleSubmit()}>
          Add to whitelist
        </button>
      </>
    );
  };

  const walletConfirmationView = () => {
    return (
      <>
        <div className='title'>Waiting for wallet approve</div>
        <img src={require('../assets/images/logo.png')} className='img' />
        <div className='loading'>
          <Loading />
        </div>
      </>
    );
  };

  const pendingView = () => {
    return (
      <>
        <div className='title'>Waiting for confirmation</div>
        <img src={require('../assets/images/logo.png')} className='img' />
        {transactionHash && (
          <button
            className='btn'
            onClick={() =>
              window.open(
                `https://api.tzstats.com/explorer/op/${transactionHash}`,
                '_blank'
              )
            }
          >
            View your transaction status
          </button>
        )}
        <div className='text whitelist'>Adding to Whitelist...</div>
      </>
    );
  };

  const successView = () => {
    return (
      <>
        <div className='title'>Registered successfully to whitelist</div>
        <img src={require('../assets/images/logo.png')} className='img' />
        <div className='text whitelist'>
          You successfully added your wallet address to the whitelist. You have
          now the permission to mint your own TezNut in the first wave. Stay
          Tuned!
        </div>
      </>
    );
  };

  const connectErrorView = () => {
    return (
      <>
        <div className='title'>Wallet connecting failed</div>
        <img src={require('../assets/images/logo.png')} className='img' />
        <button className='btn' onClick={() => handleSubmit()}>
          Retry
        </button>
      </>
    );
  };

  const transactionErrorView = () => {
    return (
      <>
        <div className='title'>Registration to whitelist failed</div>
        <img src={require('../assets/images/logo.png')} className='img' />
        <div className='text whitelist-error-view'>
          You were not able to register your wallet address to the whitelist.
          Please try it later.
        </div>
        <button className='btn' onClick={() => handleSubmit()}>
          Retry
        </button>
      </>
    );
  };

  return (
    <div className='custom-modal'>
      <div className='cross-btn' onClick={handleCloseModal}>
        &times;
      </div>
      <div className='wrapper'>
        {status === Status.NOT_CONNECTED
          ? notConnected()
          : status === Status.CONNECTING
          ? connectingView()
          : status === Status.CONNECTED
          ? connectedView()
          : status === Status.WAIT_WALLET_CONFIRMATION
          ? walletConfirmationView()
          : status === Status.TRANSACTION_PENDING
          ? pendingView()
          : status === Status.SUCCESS
          ? successView()
          : status === Status.CONNECT_ERROR
          ? connectErrorView()
          : status === Status.TRANSACTION_ERROR
          ? transactionErrorView()
          : null}
      </div>
    </div>
  );
};

export default Whitelist;
