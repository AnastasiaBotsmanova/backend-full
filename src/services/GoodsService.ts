import {PrismaClient} from '@prisma/client';
import {inject, injectable} from 'inversify';
import {Entity, IEntityService, Service} from './types';
import 'reflect-metadata';

export interface Good extends Entity {
  title: string,
}

export interface IGoodsService extends IEntityService<Good> {}

@injectable()
class GoodsService implements IGoodsService {
  private prisma: PrismaClient;

  constructor(@inject(Service.Prisma) prisma: PrismaClient) {
    this.prisma = prisma;
  }

  list = () => this.prisma.good.findMany();

  create = (good: Omit<Good, 'id'>) => {
    return this.prisma.good.create({data: good});
  };

  update = (good: Good) => {
    return this.prisma.good.update({
      where: {
        id: good.id,
      },
      data: good,
    });
  };

  byId = (id: number) => this.prisma.good.findUnique({where: {id}});

  del = async (id: number) => {
    await this.prisma.good.delete({where: {id}});
  };
}

export default GoodsService;
