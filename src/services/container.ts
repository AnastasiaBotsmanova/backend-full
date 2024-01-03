import {Container} from 'inversify';
import GoodsService, {IGoodsService} from './GoodsService';
import OrdersService, {IOrdersService} from './OrdersService';
import PricesService, {IPricesService} from './PricesService';
import StoresService, {IStoresService} from './StoresService';
import FilmsService, {IFilmsService} from './FilmsService';
import {Service} from './types';
import {PrismaClient} from '@prisma/client';

const container = new Container({defaultScope: 'Singleton'});
container.bind<IGoodsService>(Service.Goods).to(GoodsService);
container.bind<IOrdersService>(Service.Orders).to(OrdersService);
container.bind<IPricesService>(Service.Prices).to(PricesService);
container.bind<IStoresService>(Service.Stores).to(StoresService);
container.bind<IFilmsService>(Service.Films).to(FilmsService);
container.bind<PrismaClient>(Service.Prisma).toDynamicValue(() => new PrismaClient()).onDeactivation(
  (prisma) => prisma.$disconnect(),
);

export default container;
