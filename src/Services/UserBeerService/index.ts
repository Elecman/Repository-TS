import { IBaseService } from "../BaseService";
import { action, makeAutoObservable, observable, runInAction, set } from "mobx";
import { TUserBeersModel } from "../../Models/UserBeers";
import { UserBeerRepository } from "../../Repository/UserBeerRepository";
import { TUserBeersScheme } from "../../Scheme/UserBeerScheme";
import { UserBeerAdapter } from "../../Adapter/UserBeerAdapter";


export class UserBeerService implements IBaseService<TUserBeersScheme> {
  @observable
  public userBeerCollection: TUserBeersModel = {};

  constructor(private repository: UserBeerRepository, private adapter: UserBeerAdapter) {
    makeAutoObservable(this);
    this.repository = repository;
    this.adapter = adapter;
  }

  @action
  public async fetchAll(): Promise<void> {
    throw new Error("Method not implemented.");
  }

  @action
  public async update(entity: TUserBeersScheme): Promise<void> {
    const newCollection = await this.adapter.createCollection(entity);
    runInAction(() => {
      set(this.userBeerCollection, newCollection);
    });
  }

  create(entity: Omit<TUserBeersScheme, "id">): Promise<void> {
    throw new Error("Method not implemented.");
  }

  delete(id: string): Promise<void> {
    throw new Error("Method not implemented.");
  }

  fetchOne(id: string): Promise<void> {
    throw new Error("Method not implemented.");
  }

  fetchMultiple(id: string[]): Promise<void> {
    throw new Error("Method not implemented.");
  }
}

export const UserBeerServiceAPI = new UserBeerService(new UserBeerRepository(), new UserBeerAdapter());
