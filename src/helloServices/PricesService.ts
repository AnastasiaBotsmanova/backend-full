export interface Price {
  id: number,
  goodId: number,
  storeId: number,
  amount: number,
}

class PricesService {
  prices: Price[] = [
    {
      id: 1,
      goodId: 1,
      storeId: 1,
      amount: 50,
    },
    {
      id: 2,
      goodId: 1,
      storeId: 2,
      amount: 100,
    },
    {
      id: 3,
      goodId: 2,
      storeId: 1,
      amount: 30,
    },
    {
      id: 4,
      goodId: 2,
      storeId: 2,
      amount: 60,
    },
  ];

  list = () => this.prices;

  create = (price: Omit<Price, 'id'>) => {
    const maxId = Math.max(...this.prices.map(price => price.id));
    const id = maxId + 1;

    this.prices.push({
      ...price,
      id,
    });

    return this.byId(id);
  };

  update = (price: Price) => {
    this.prices = this.prices.map(
      current => (current.id === price.id ? price : current),
    );

    return this.byId(price.id);
  };

  byId = (id: number) => {
    this.prices.find(price => price.id === id);
  };

  getPrice = (goodId: number, storeId: number) =>
    this.prices.find(price => price.goodId === goodId &&
    price.storeId === storeId)?.amount ?? 0;

  del = (id: number) => {
    this.prices = this.prices.filter(price => price.id !== id);
  };
}

export default PricesService;
