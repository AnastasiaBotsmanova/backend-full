import {Container} from 'inversify';
import {log} from '../log';
import GoodsService, {IGoodsService} from './GoodsService';
import OrdersService, {IOrdersService} from './OrdersService';
import PricesService, {IPricesService} from './PricesService';
import StoresService, {IStoresService} from './StoresService';
import {Service} from './types';
import 'reflect-metadata';

// yarn ts-node src/helloInversionOfControl/testRun.ts

const app = async () => {
  log.info('start');

  const container = new Container();
  container.bind<IGoodsService>(Service.Goods).to(GoodsService);
  container.bind<IOrdersService>(Service.Orders).to(OrdersService);
  container.bind<IPricesService>(Service.Prices).to(PricesService);
  container.bind<IStoresService>(Service.Stores).to(StoresService);

  const goodsService = container.get<IGoodsService>(Service.Goods);
  const ordersService = container.get<IOrdersService>(Service.Orders);
  const pricesService = container.get<IPricesService>(Service.Prices);
  const storesService = container.get<IStoresService>(Service.Stores);

  log.info(goodsService.list());

  log.info(goodsService.create({title: 'Banana'}));

  log.info(goodsService.list());

  log.info(goodsService.update({id: 2, title: 'Tomato'}));

  log.info(goodsService.list());

  log.info(goodsService.del(1));

  log.info(goodsService.list());

  log.info(storesService.list());

  log.info(pricesService.list());

  log.info(ordersService.list());

  log.info(ordersService.create({goodId: 1, storeId: 1, quantity: 10}));

  log.info(ordersService.list());

  log.info('finish');
};

app();
