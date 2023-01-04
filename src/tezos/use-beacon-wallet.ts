import { useState } from 'react';
import { TezosToolkit } from '@taquito/taquito';

import { BeaconWalletHook } from './types';
import { useTezosContext } from './TezosContext';
import { useBalance } from './use-balance';
import { NetworkType } from '@airgap/beacon-sdk/dist/cjs/types/beacon/NetworkType';
import { PermissionScope } from '@airgap/beacon-sdk';

export function useBeaconWallet(): BeaconWalletHook {
  const { tezos }: { tezos?: TezosToolkit } = useTezosContext();
  const [initialized, setInit] = useState(false);
  const [address, setAddress] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const balanceState = useBalance(address);
  const [wallet, setWallet] = useState<any>(null);

  return {
    wallet,
    initialized,
    address,
    walletConnect: connect,
    walletError: error,
    walletLoading: loading,
    balance: balanceState.balance,
    walletClearError: clearErrors,
  };

  async function connect(options: any, network: NetworkType) {
    try {
      setError(null);
      setLoading(true);
      const address: string = await initWallet(options, network);
      setInit(true);
      setAddress(address);
    } catch (error: any) {
      setError(error?.message);
    } finally {
      setLoading(false);
    }
  }

  function clearErrors() {
    setError(null);
    balanceState.balanceClearError();
  }

  async function initWallet(
    options: any,
    network: NetworkType
  ): Promise<string> {
    if (typeof window === 'undefined') {
      throw new Error('Window is undefined');
    }
    if (!tezos) {
      throw new Error('Tezos object is undefined');
    }

    clearErrors();

    const { BeaconWallet } = await import('@taquito/beacon-wallet');

    const wallet = new BeaconWallet(options);

    await wallet.requestPermissions({
      network: { type: network },
      scopes: [
        PermissionScope.OPERATION_REQUEST,
        PermissionScope.SIGN,
        PermissionScope.THRESHOLD,
      ],
    });

    tezos.setWalletProvider(wallet);
    setWallet(wallet);

    return await wallet.getPKH();
  }
}
