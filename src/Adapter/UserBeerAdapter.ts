import { IAdapter } from "./Base";
import { TUserBeersScheme } from "../Scheme/UserBeerScheme";
import { TUserBeersModel } from "../Models/UserBeers";

export class UserBeerAdapter implements IAdapter<TUserBeersModel> {
  createCollection(entity: TUserBeersScheme): TUserBeersModel {
    const { users, beers } = entity;
    let collection: TUserBeersModel = {};
    Object.values(users).forEach((user, idx) => {
      const userBeer = Object.values(beers)[idx];
      if (user.uid) {
        collection[user.uid] = {
          ...user,
          beer: userBeer.name,
          beerUid: userBeer.uid,
        };
      }
    });
    return collection;
  }

  updateCollectionItem(collection: TUserBeersModel, data: Partial<TUserBeersScheme>): TUserBeersModel {
    // if (data?.users?.uid && collection[data.users.uid]) {
    //   return {
    //     ...collection,
    //     [data.user.uid]: {
    //       ...collection[data.user.uid],
    //       ...data
    //     }
    //   };
    // }
    return collection;
  }
}
