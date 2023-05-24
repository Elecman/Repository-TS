import { createContext, FC, ReactNode, useContext } from "react";
import { observer } from "mobx-react-lite";
import { UserService, UserServiceAPI } from "../../Services/UserService";
import { BeerService, BeerServiceAPI } from "../../Services/BeerService";
import { UserBeerService, UserBeerServiceAPI } from "../../Services/UserBeerService";

export interface FCWithChildren {
  children?: ReactNode;
}

interface IInitialStore {
  UserService: UserService;
  BeerService: BeerService;
  UserBeerService: UserBeerService;
}

const initialStore: IInitialStore = {
  UserService: UserServiceAPI,
  BeerService: BeerServiceAPI,
  UserBeerService: UserBeerServiceAPI
};

export const StoreContext = createContext<IInitialStore>(initialStore);

export const StoreProvider: FC<FCWithChildren> = observer(
  ({ children }) => <StoreContext.Provider value={initialStore}>{children}</StoreContext.Provider>);

export function useStore() {
  return useContext(StoreContext);
}
