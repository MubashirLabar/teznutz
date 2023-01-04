import { useEffect, useState } from 'react';
import { useTezosContext } from './TezosContext';
import { ContractHook, MintObject, State } from './types';
import { WalletContract } from '@taquito/taquito';
import { validateAddress } from '@taquito/utils';

export function useContract(
  contractAddress: string,
  refreshInterval?: number
): ContractHook {
  const { tezos }: State = useTezosContext();
  const [contract, setContract] = useState<WalletContract | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [storage, setStorage] = useState<any>();
  const [contractLoading, setContractLoading] = useState(false);
  const [storageLoading, setStorageLoading] = useState(false);
  const [walletPending, setwalletPending] = useState(false);
  const [transactionPending, settransactionPending] = useState(false);
  const [minted, setMinted] = useState(false);
  const [whiteListed, setWhiteListed] = useState(false);
  const [mintObject, setMintObject] = useState<MintObject | null>(null);
  const [transactionHash, setTransactionHash] = useState<string | null>(null);
  const [refreshStorageInterval, setRefreshStorageInterval] = useState<any>();

  useEffect(() => {
    loadStorage(contract);
    clearInterval(refreshStorageInterval);
    // sets interval
    const interval = setInterval(
      async () => loadStorage(contract),
      refreshInterval || 60000
    );
    setRefreshStorageInterval(interval);
    return () => {
      clearInterval(refreshStorageInterval);
    };
  }, [contract]);

  useEffect(() => {
    if (validateAddress(contractAddress) === 3) {
      connect();
    }
  }, [contractAddress]);

  return {
    contract,
    contractError: error,
    storage,
    contractLoading: contractLoading,
    storageLoading: storageLoading,
    contractConnect: connect,
    walletPending: walletPending,
    transactionPending: transactionPending,
    mint: mint,
    minted: minted,
    addToWhiteList: addToWhiteList,
    whiteListed: whiteListed,
    transactionHash: transactionHash,
    mintObject: mintObject,
    contractClearError: clearError,
  };

  function clearError() {
    setError(null);
  }

  async function connect() {
    if (!tezos) {
      setError('No Tezos provider');
      return;
    }

    clearError();
    setContractLoading(true);
    try {
      const contractInstance = await tezos.wallet.at(contractAddress);
      setContract(contractInstance);
    } catch (err: any) {
      setError(err?.message);
    } finally {
      setContractLoading(false);
    }
  }

  async function loadStorage(contract: WalletContract | null) {
    if (!contract) {
      return;
    }
    try {
      setStorageLoading(true);
      const storage: Storage = await contract.storage();
      setStorage(storage);
    } catch (e: any) {
      setError(e?.message);
    } finally {
      setStorageLoading(false);
    }
  }

  async function mint(contract: WalletContract | null, mintPrice: number) {
    if (!contract) {
      return;
    }
    try {
      setwalletPending(true);
      setMinted(false);
      const op = await contract.methods
        .mint()
        .send({ amount: mintPrice, mutez: true });
      setwalletPending(false);
      settransactionPending(true);
      const txHash = op.opHash;
      setTransactionHash(op.opHash);
      await op.confirmation();
      const url = 'https://api.tzstats.com/explorer/op/' + txHash;
      const obj = await (await fetch(url)).json();
      const ipfsInBytes = obj[1].parameters.value.mint_artist.metadata_cid;
      const ipfsUrl = hex_to_ascii(ipfsInBytes);
      setMintObject({
        id: obj[1].parameters.id,
        imageUrl: await getImageFromIpfs(ipfsUrl),
      });
      setMinted(true);
      settransactionPending(false);
    } catch (e: any) {
      setError(e?.message);
    } finally {
      setwalletPending(false);
      settransactionPending(false);
    }
  }

  async function addToWhiteList(contract: WalletContract | null) {
    if (!contract) {
      return;
    }
    try {
      setwalletPending(true);
      setWhiteListed(false);
      const op = await contract.methods.mint().send();
      setwalletPending(false);
      settransactionPending(true);

      const txHash = op.opHash;
      setTransactionHash(txHash);
      await op.confirmation();
      setWhiteListed(true);
      settransactionPending(false);
    } catch (e: any) {
      setError(e?.message);
    } finally {
      setwalletPending(false);
      settransactionPending(false);
    }
  }

  async function getImageFromIpfs(ipfsUrl: string) {
    const ipfsId = ipfsUrl.split('//')[1];
    const url = 'https://ipfs.io/ipfs/' + ipfsId;
    const obj = await (await fetch(url)).json();
    const imageId = obj.displayUri.split('//')[1];
    return 'https://ipfs.io/ipfs/' + imageId;
  }

  function hex_to_ascii(bytes: string) {
    const hex = bytes.toString();
    let str = '';
    for (let n = 0; n < hex.length; n += 2) {
      str += String.fromCharCode(parseInt(hex.substr(n, 2), 16));
    }
    return str;
  }
}
