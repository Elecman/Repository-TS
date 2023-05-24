import { IBaseRepository } from "./BaseRepository";
import { makeAutoObservable} from "mobx";
import axios from "axios";
import { TMaybe } from "../TypeUtils";
import { TUserFragment } from "../Scheme/UserScheme";


export class UserBeerRepository implements IBaseRepository<TUserFragment> {
  constructor() {
    makeAutoObservable(this)
  }

  public async fetchAll(): Promise<TMaybe<TUserFragment[]>> {
    try {
      const {data} = await axios.get<TUserFragment[]>('https://random-data-api.com/api/v2/users?size=20');
      return data;
    } catch (e) {
      console.error(e);
    }
    return Promise.resolve(undefined);
  }

  public async fetchOne(id: string): Promise<TMaybe<TUserFragment>> {
    return Promise.resolve(undefined);
  }

  public async update(entity: TUserFragment): Promise<TMaybe<TUserFragment>> {
    return Promise.resolve(undefined);
  }

  public async create(entity: Omit<TUserFragment, "id">): Promise<TMaybe<TUserFragment>> {
    return Promise.resolve(undefined);
  }

  public async delete(id: string): Promise<boolean> {
    return Promise.resolve(false);
  }
}
