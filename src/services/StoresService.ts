import {PrismaClient} from '@prisma/client';
import {inject, injectable} from 'inversify';
import {Entity, IEntityService, Service} from './types';
import 'reflect-metadata';

export interface Store extends Entity {
  title: string,
}

export interface IStoresService extends IEntityService<Store> {}

@injectable()
class StoresService implements IStoresService {
  private prisma: PrismaClient;

  constructor(@inject(Service.Prisma) prisma: PrismaClient) {
    this.prisma = prisma;
  }

  list = () => this.prisma.store.findMany();

  create = (store: Omit<Store, 'id'>) => {
    return this.prisma.store.create({data: store});
  };

  update = (store: Store) => {
    return this.prisma.store.update({
      where: {
        id: store.id,
      },
      data: store,
    });
  };

  byId = (id: number) => this.prisma.store.findUnique({where: {id}});

  del = async (id: number) => {
    await this.prisma.store.delete({where: {id}});
  };
}

export default StoresService;
