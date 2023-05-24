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
  }

  public async fetchOne(id: string): Promise<TMaybe<TBeerFragment>> {
    throw new Error("Method not implemented.");
  }

  public async update(entity: TBeerFragment): Promise<TMaybe<TBeerFragment>> {
    throw new Error("Method not implemented.");
  }

  public async create(entity: Omit<TBeerFragment, "id">): Promise<TMaybe<TBeerFragment>> {
    throw new Error("Method not implemented.");
  }

  public async delete(id: string): Promise<boolean> {
    throw new Error("Method not implemented.");
  }

  fetchMultiple(id: string[]): Promise<TMaybe<TBeerFragment[]>> {
    throw new Error("Method not implemented.");
  }
}
