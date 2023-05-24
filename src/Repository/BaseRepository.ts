import { TMaybe } from "../TypeUtils";

export interface IBaseRepository<T> {
  fetchAll(): Promise<TMaybe<T[]>>;

  fetchOne(id: string): Promise<TMaybe<T>>;

  fetchMultiple(id: string[]): Promise<TMaybe<T[]>>;

  create(entity: Partial<Omit<T, "id">>): Promise<TMaybe<T>>;

  update(entity: Partial<T>): Promise<TMaybe<T>>;

  delete(id: string): Promise<boolean>;
}
