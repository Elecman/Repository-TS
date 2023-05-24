import { IBaseService } from "../BaseService";
import { TUserModel } from "../../Models/User";
import { UserRepository } from "../../Repository/UserRepository";
import { action, makeAutoObservable, observable, runInAction, set } from "mobx";
import { UserAdapter } from "../../Adapter/UserAdapter";
import { TUserFragment } from "../../Scheme/UserScheme";


export class UserService implements IBaseService<TUserFragment> {
  @observable
  public userCollection: TUserModel = {};

  constructor(private repository: UserRepository, private adapter: UserAdapter) {
    makeAutoObservable(this);
    this.repository = repository;
    this.adapter = adapter;
  }

  @action
  public async fetchAll(): Promise<void> {
    const data = await this.repository.fetchAll();
    runInAction(() => {
      if (data) {
        this.userCollection = this.adapter.createCollection(data)
      }
    });
  }

  @action
  public async update(entity: Partial<TUserFragment>): Promise<void> {
    const newCollection = await this.adapter.updateCollectionItem(this.userCollection, entity);
    runInAction(() => {
      set(this.userCollection, newCollection);
    });
  }

  create(entity: Omit<TUserFragment, "id">): Promise<void> {
    return Promise.resolve(undefined);
  }

  delete(id: string): Promise<void> {
    return Promise.resolve(undefined);
  }

  fetchOne(id: string): Promise<void> {
    return Promise.resolve(undefined);
  }
}

export const UserServiceAPI = new UserService(new UserRepository(), new UserAdapter());
