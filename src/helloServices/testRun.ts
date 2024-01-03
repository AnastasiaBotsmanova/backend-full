import {log} from '../log';
import GoodsService from './GoodsService';
import OrdersService from './OrdersService';
import PricesService from './PricesService';
import StoresService from './StoresService';

// yarn ts-node src/helloServices/testRun.ts

const app = async () => {
  log.info('start');

  const goodsService = new GoodsService();
  const storesService = new StoresService();
  const pricesService = new PricesService();
  const ordersService = new OrdersService(pricesService);

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
