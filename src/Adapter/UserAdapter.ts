import { IAdapter } from "./Base";
import { TUserFragment} from "../Scheme/UserScheme";
import { TUserModel } from "../Models/User";

export class UserAdapter implements IAdapter<TUserModel> {
  createCollection(entity: TUserFragment[]): TUserModel {
    let collection: TUserModel = {};
    entity.forEach((resultUser) => {
      if (resultUser.uid) collection[resultUser.uid] = resultUser;
    });
    return collection;
  }

  updateCollectionItem(collection: TUserModel, data: Partial<TUserFragment>): TUserModel {
    if (data?.uid && collection[data.uid]) {
      return {
        ...collection,
        [data.uid]: {
          ...collection[data.uid],
          ...data
        }
      };
    }
    return collection;
  }
}
