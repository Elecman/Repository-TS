import { IBaseService } from "../BaseService";
import { TBeerFragment } from "../../Scheme/BeerScheme";
import { makeAutoObservable, observable, runInAction, set } from "mobx";
import { TBeerModel } from "../../Models/Beer";
import { BeerRepository } from "../../Repository/BeerRepository";
import { BeerAdapter } from "../../Adapter/BeerAdapter";

export class BeerService implements IBaseService<TBeerFragment> {
  @observable
  public beerCollection: TBeerModel = {};

  constructor(private repository: BeerRepository, private adapter: BeerAdapter) {
    makeAutoObservable(this);
  }

  fetchMultiple(id: string[]): Promise<void> {
    throw new Error("Method not implemented.");
  }

  create(entity: Omit<TBeerFragment, "id">): Promise<void> {
    throw new Error("Method not implemented.");
  }

  delete(id: string): Promise<void> {
    throw new Error("Method not implemented.");
  }

  public async fetchAll(): Promise<void> {
    const data = await this.repository.fetchAll();
    runInAction(() => {
      if (data) {
        this.beerCollection = this.adapter.createCollection(data);
      }
    });
  }

  fetchOne(id: string): Promise<void> {
    throw new Error("Method not implemented.");
  }

  public async update(entity: Partial<TBeerFragment>): Promise<void> {
    const newCollection = await this.adapter.updateCollectionItem(this.beerCollection, entity);
    runInAction(() => {
      set(this.beerCollection, newCollection);
    });
  }
}

export const BeerServiceAPI = new BeerService(new BeerRepository(), new BeerAdapter());
