import { ContractAbstraction, TezosToolkit, Wallet } from '@taquito/taquito';
import React from 'react';
import { BeaconWallet } from '@taquito/beacon-wallet';
import { DAppClientOptions } from '@airgap/beacon-sdk';
import { NetworkType } from '@airgap/beacon-sdk/dist/cjs/types/beacon/NetworkType';

export interface TezosProviderProps {
  tezos?: TezosToolkit;
  children: React.ReactNode;
}

export interface State {
  tezos?: TezosToolkit;
}

export interface ContractHook {
  contract: ContractAbstraction<Wallet> | null;
  contractError: string | null;
  storage: any;
  contractLoading: boolean;
  storageLoading: boolean;
  contractConnect: () => void;
  walletPending: boolean;
  transactionPending: boolean;
  mint: (
    contract: ContractAbstraction<Wallet> | null,
    mintPrice: number
  ) => void;
  minted: boolean;
  addToWhiteList: (contract: ContractAbstraction<Wallet> | null) => void;
  whiteListed: boolean;
  transactionHash: string | null;
  mintObject: MintObject | null;
  contractClearError: () => void;
}

export interface BeaconWalletHook {
  wallet: BeaconWallet | null;
  initialized: boolean;
  address: string;
  walletConnect: (options: DAppClientOptions, network: NetworkType) => void;
  walletError: string | null;
  walletLoading: boolean;
  balance: number;
  walletClearError: () => void;
}

export interface BalanceHook {
  balance: number;
  balanceError: string | null;
  balanceLoading: boolean;
  balanceClearError: () => void;
  balanceInTez: () => number;
}

export interface MintObject {
  id: number;
  imageUrl: string;
}
