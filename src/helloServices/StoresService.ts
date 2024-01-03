export interface Store {
  id: number,
  title: string,
}

class StoresService {
  stores: Store[] = [
    {
      id: 1,
      title: 'Основной',
    },
    {
      id: 2,
      title: 'Дополнительный',
    },
  ];

  list = () => this.stores;

  create = (store: Omit<Store, 'id'>) => {
    const maxId = Math.max(...this.stores.map(store => store.id));
    const id = maxId + 1;

    this.stores.push({
      ...store,
      id,
    });

    return this.byId(id);
  };

  update = (store: Store) => {
    this.stores = this.stores.map(
      current => (current.id === store.id ? store : current),
    );

    return this.byId(store.id);
  };

  byId = (id: number) => {
    this.stores.find(store => store.id === id);
  };

  del = (id: number) => {
    this.stores = this.stores.filter(store => store.id !== id);
  };
}

export default StoresService;
