export interface Good {
  id: number,
  title: string,
}

class GoodsService {
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

    return this.byId(id);
  };

  update = (good: Good) => {
    this.goods = this.goods.map(
      current => (current.id === good.id ? good : current),
    );

    return this.byId(good.id);
  };

  byId = (id: number) => {
    this.goods.find(good => good.id === id);
  };

  del = (id: number) => {
    this.goods = this.goods.filter(good => good.id !== id);
  };
}

export default GoodsService;
