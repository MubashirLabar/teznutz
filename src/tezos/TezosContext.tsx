import * as React from 'react';
import { State, TezosProviderProps } from './types';

export const TezosContext = React.createContext<State>({});

export const useTezosContext = (): State => React.useContext(TezosContext);

export function TezosContextProvider({
  tezos,
  children,
}: TezosProviderProps): React.ReactElement {
  return (
    <TezosContext.Provider value={{ tezos }}>{children}</TezosContext.Provider>
  );
}
