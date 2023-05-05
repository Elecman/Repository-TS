import { createContext, FC, ReactNode, useContext, useId } from "react";
import { CounterService, CounterServiceAPI } from "../../Services/Counter";
import { observer, useLocalObservable, useLocalStore } from "mobx-react-lite";

export interface FCWithChildren {
  children?: ReactNode
}

interface IInitialStore {
  CounterService: CounterService
}

const initialStore: IInitialStore = {
  CounterService: CounterServiceAPI
}

export const StoreContext = createContext<IInitialStore>(initialStore);

export const StoreProvider: FC<FCWithChildren> = observer(
  ({children}) => <StoreContext.Provider value={initialStore}>{children}</StoreContext.Provider>)

export function useStore() {
  return useLocalObservable(() => ({
    CounterService: CounterServiceAPI
  }))
}
