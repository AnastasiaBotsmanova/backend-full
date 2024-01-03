export interface Good {
  id: number,
  title: string,
}

export interface IGoodsService {
  list: () => Good[],
  create: (good: Omit<Good, 'id'>) => Good,
  update: (good: Good) => Good,
  byId: (id: number) => Good | undefined,
  del: (id: number) => void,
}

class GoodsService implements IGoodsService {
  goods: Good[] = [
    {
      id: 1,
      title: 'Orange',
    },
    {
      id: 2,
      title: 'Apple',
    },
  ];

  list = () => this.goods;

  create = (good: Omit<Good, 'id'>) => {
    const maxId = Math.max(...this.goods.map(good => good.id));
    const id = maxId + 1;

    this.goods.push({
      ...good,
      id,
    });

    return this.byId(id) as Good;
  };

  update = (good: Good) => {
    this.goods = this.goods.map(
      curent => (curent.id === good.id ? good : curent),
    );

    return this.byId(good.id) as Good;
  };

  byId = (id: number) => this.goods.find(good => good.id === id);

  del = (id: number) => {
    this.goods = this.goods.filter(good => good.id !== id);
  };
}

export default GoodsService;
