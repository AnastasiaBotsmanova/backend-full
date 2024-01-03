import {inject, injectable} from 'inversify';
import {IPricesService} from './PricesService';
import {Entity, IEntityService, Service} from './types';
import {PrismaClient} from '@prisma/client';
import 'reflect-metadata';

export interface Order extends Entity {
  goodId: number,
  storeId: number,
  quantity: number,
  total: number,
}

export interface IOrdersService extends IEntityService<Order> {
  [x: string]: any;
  create: (good: Omit<Order, 'id' | 'total'>) => Promise<Order>,
  update: (order: Omit<Order, 'total'>) => Promise<Order>,
}

@injectable()
class OrdersService implements IOrdersService {
  private prices: IPricesService;
  private prisma: PrismaClient;

  constructor(
    @inject(Service.Prices) prices: IPricesService,
    @inject(Service.Prisma) prisma: PrismaClient,
  ) {
    this.prices = prices;
    this.prisma = prisma;
  }

  list = () => this.prisma.order.findMany();

  create = async (order: Omit<Order, 'id' | 'total'>) => {
    const total = await this.prices.getPrice(order.goodId, order.storeId) * order.quantity;

    return this.prisma.order.create({data: {
      total,
      ...order,
    }});
  };

  update = async (order: Omit<Order, 'total'>) => {
    const total = await this.prices.getPrice(order.goodId, order.storeId) * order.quantity;

    return this.prisma.order.update({
      where: {
        id: order.id,
      },
      data: {
        total,
        ...order,
      },
    });
  };

  byId = (id: number) => this.prisma.order.findUnique({where: {id}});

  del = async (id: number) => {
    await this.prisma.order.delete({where: {id}});
  };
}

export default OrdersService;
