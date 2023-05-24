import { IBaseRepository } from "./BaseRepository";
import { makeAutoObservable} from "mobx";
import axios from "axios";
import { TMaybe } from "../TypeUtils";
import { TBeerFragment } from "../Scheme/BeerScheme";


export class BeerRepository implements IBaseRepository<TBeerFragment> {
  constructor() {
    makeAutoObservable(this)
  }

  public async fetchAll(): Promise<TMaybe<TBeerFragment[]>> {
    try {
      const {data} = await axios.get<TBeerFragment[]>('https://random-data-api.com/api/v2/beers?size=20');
      return data;
    } catch (e) {
      console.error(e);
    }
    return Promise.resolve(undefined);
  }

  public async fetchOne(id: string): Promise<TMaybe<TBeerFragment>> {
    return Promise.resolve(undefined);
  }

  public async update(entity: TBeerFragment): Promise<TMaybe<TBeerFragment>> {
    return Promise.resolve(undefined);
  }

  public async create(entity: Omit<TBeerFragment, "id">): Promise<TMaybe<TBeerFragment>> {
    return Promise.resolve(undefined);
  }

  public async delete(id: string): Promise<boolean> {
    return Promise.resolve(false);
  }
}
