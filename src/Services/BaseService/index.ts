export interface IBaseService<T> {
  fetchAll(): Promise<void>;

  fetchOne(id: string): Promise<void>;

  fetchMultiple(id: string[]): Promise<void>;

  update(entity: Partial<T>): Promise<void>;

  create(entity: Omit<T, "id">): Promise<void>;

  delete(id: string): Promise<void>;
}
