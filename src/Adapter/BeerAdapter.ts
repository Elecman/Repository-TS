import { IAdapter } from "./Base";
import { TBeerFragment } from "../Scheme/BeerScheme";
import { TBeerModel } from "../Models/Beer";

export class BeerAdapter implements IAdapter<TBeerModel> {
  createCollection(entity: TBeerFragment[]): TBeerModel {
    let collection: TBeerModel = {};
    entity.forEach((resultBeer) => {
      if (resultBeer.uid) collection[resultBeer.uid] = resultBeer;
    });
    return collection;
  }

  updateCollectionItem(collection: TBeerModel, data: Partial<TBeerFragment>): TBeerModel {
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
