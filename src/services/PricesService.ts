import {PrismaClient} from '@prisma/client';
import {inject, injectable} from 'inversify';
import {Entity, IEntityService, Service} from './types';
import 'reflect-metadata';

export interface Price extends Entity {
  goodId: number,
  storeId: number,
  amount: number,
}

export interface IPricesService extends IEntityService<Price> {
  getPrice: (goodId: number, storeId: number) => Promise<number>,
}

@injectable()
class PricesService implements IPricesService {
  private prisma: PrismaClient;

  constructor(@inject(Service.Prisma) prisma: PrismaClient) {
    this.prisma = prisma;
  }

  list = () => this.prisma.price.findMany();

  create = (price: Omit<Price, 'id'>) => {
    return this.prisma.price.create({data: price});
  };

  update = (price: Price) => {
    return this.prisma.price.update({
      where: {
        id: price.id,
      },
      data: price,
    });
  };

  byId = (id: number) => this.prisma.price.findUnique({where: {id}});

  del = async (id: number) => {
    await this.prisma.price.delete({where: {id}});
  };

  getPrice = async (goodId: number, storeId: number) => {
    return (await this.prisma.price.findFirst({where: {goodId, storeId}}))?.amount ?? 0;
  };
}

export default PricesService;
