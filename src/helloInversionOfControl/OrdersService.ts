import {inject} from 'inversify';
import {IPricesService} from './PricesService';
import {Service} from './types';

export interface Order {
  id: number,
  goodId: number,
  storeId: number,
  quantity: number,
  total: number,
}

export interface IOrdersService {
  list: () => Order[],
  create: (good: Omit<Order, 'id' | 'total'>) => Order,
  update: (good: Order) => Order,
  byId: (id: number) => Order | undefined,
  del: (id: number) => void
}

class OrdersService implements IOrdersService {
  orders: Order[] = [
    {
      id: 1,
      goodId: 1,
      storeId: 1,
      quantity: 5,
      total: 250,
    },
    {
      id: 2,
      goodId: 1,
      storeId: 2,
      quantity: 10,
      total: 300,
    },
  ];

  pricesService: IPricesService;

  constructor(@inject(Service.Prices) pricesService: IPricesService) {
    this.pricesService = pricesService;
  }

  list = () => this.orders;

  create = (order: Omit<Order, 'id' | 'total'>) => {
    const maxId = Math.max(...this.orders.map(order => order.id));
    const id = maxId + 1;

    const price = this.pricesService.getPrice(order.goodId, order.storeId);

    this.orders.push({
      ...order,
      id,
      total: order.quantity * price,
    });

    return this.byId(id) as Order;
  };

  update = (order: Order) => {
    this.orders = this.orders.map(
      curent => (curent.id === order.id ? order : curent),
    );

    return this.byId(order.id) as Order;
  };

  byId = (id: number) => this.orders.find(order => order.id === id);

  del = (id: number) => {
    this.orders = this.orders.filter(order => order.id !== id);
  };
}

export default OrdersService;
