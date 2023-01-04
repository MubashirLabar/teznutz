import { useEffect, useState } from 'react';
import { useTezosContext } from './TezosContext';
import { BalanceHook } from './types';

export function useBalance(address = ''): BalanceHook {
  const { tezos } = useTezosContext();
  const [balance, setBalance] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    (async () => {
      await loadBalance(address);
    })();
  }, [address]);

  return {
    balance,
    balanceError: error,
    balanceLoading: loading,
    balanceClearError: clearError,
    balanceInTez,
  };

  function clearError() {
    setError(null);
  }

  function balanceInTez() {
    return balance / 10 ** 6;
  }

  async function loadBalance(address: string) {
    if (!address) {
      return;
    }

    if (!tezos) {
      throw new Error('Tezos object is undefined');
    }
    try {
      setLoading(true);
      const balance = await tezos.tz.getBalance(address);
      setBalance(balance.toNumber());
    } catch (e: any) {
      setError(e?.message);
    } finally {
      setLoading(false);
    }
  }
}
