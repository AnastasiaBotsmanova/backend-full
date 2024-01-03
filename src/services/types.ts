export enum Service {
  Goods = 'goods',
  Stores = 'stores',
  Prices = 'prices',
  Orders = 'orders',
  Films = 'films',
  Prisma = 'prisma',
}

export interface Entity {
  id: number
}

export interface IEntityService<T extends Entity> {
  list: () => Promise<T[]>,
  create: (entity: Omit<T, 'id'>) => Promise<T>,
  update: (entity: T) => Promise<T>,
  byId: (id: number) => Promise<T | null>,
  del: (id: number) => Promise<void>,
}
