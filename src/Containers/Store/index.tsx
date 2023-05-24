import { createContext, FC, ReactNode, useContext } from "react";
import { observer } from "mobx-react-lite";
import { UserService, UserServiceAPI } from "../../Services/UserService";
import { BeerService, BeerServiceAPI } from "../../Services/BeerService";

export interface FCWithChildren {
  children?: ReactNode;
}

interface IInitialStore {
  UserService: UserService;
  BeerService: BeerService;
}

const initialStore: IInitialStore = {
  UserService: UserServiceAPI,
  BeerService: BeerServiceAPI
};

export const StoreContext = createContext<IInitialStore>(initialStore);

export const StoreProvider: FC<FCWithChildren> = observer(
  ({ children }) => <StoreContext.Provider value={initialStore}>{children}</StoreContext.Provider>);

export function useStore() {
  return useContext(StoreContext);
}
