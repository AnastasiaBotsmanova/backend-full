import {log} from '../log';
import {IGoodsService} from '../services/GoodsService';
import {IOrdersService} from '../services/OrdersService';
import {IPricesService} from '../services/PricesService';
import {IStoresService} from '../services/StoresService';
import container from '../services/container';
import {Service} from '../services/types';

const app = async () => {
  log.info('start');

  const goodsService = container.get<IGoodsService>(Service.Goods);
  const storesService = container.get<IStoresService>(Service.Stores);
  const pricesService = container.get<IPricesService>(Service.Prices);
  const ordersService = container.get<IOrdersService>(Service.Orders);

  const apple = await goodsService.create({title: 'Яблоко'});
  const tomato = await goodsService.create({title: 'Помидор'});
  const banana = await goodsService.create({title: 'Банан'});

  const main = await storesService.create({title: 'Основной'});
  const secondary = await storesService.create({title: 'Дополнительный'});

  await pricesService.create({goodId: apple.id, storeId: main.id, amount: 10});
  await pricesService.create({goodId: tomato.id, storeId: secondary.id, amount: 25});
  await pricesService.create({goodId: banana.id, storeId: main.id, amount: 30});

  await ordersService.create({goodId: apple.id, storeId: main.id, quantity: 10});
  await ordersService.create({goodId: tomato.id, storeId: secondary.id, quantity: 4});
  await ordersService.create({goodId: banana.id, storeId: main.id, quantity: 10});

  log.info('finish');
};

app();
