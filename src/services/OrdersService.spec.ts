import {Prisma} from '@prisma/client';
import 'jest-extended';
import container from './container';
import {IOrdersService} from './OrdersService';
import {Service} from './types';

// yarn jest --testPathPattern OrdersService

describe('OrdersService', () => {
  it('расчитывает total как произведение цены и колличества', async () => {
    const price = 1000;

    const getPrice = jest.fn(() => price);
    container.unbind(Service.Prices);
    container.bind(Service.Prices).toConstantValue({getPrice});

    const orderCreate = jest.fn((_args: Prisma.OrderCreateArgs) => undefined);
    container.unbind(Service.Prisma);
    container.bind(Service.Prisma).toConstantValue({
      order: {
        create: orderCreate,
      },
    });

    const ordersService = container.get<IOrdersService>(Service.Orders);

    await ordersService.create({goodId: 1, storeId: 2, quantity: 100});

    // проверка вызова метода определения цены
    expect(getPrice.mock.calls).toHaveLength(1);
    expect(getPrice.mock.calls[0]).toEqual([1, 2]);

    // проверка вызова метода создания заказа
    expect(orderCreate.mock.calls).toHaveLength(1);
    expect(orderCreate.mock.calls[0][0].data).toEqual({goodId: 1, storeId: 2, quantity: 100, total: 100_000});
  });
});
