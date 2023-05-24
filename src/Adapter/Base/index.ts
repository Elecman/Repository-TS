export interface IAdapter<Entity> {
  createCollection(data: any): Entity
  updateCollectionItem(collection: Entity, data: any): Entity
}
