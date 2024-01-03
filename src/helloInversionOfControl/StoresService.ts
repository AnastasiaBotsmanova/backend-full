export interface Store {
  id: number,
  title: string
}

export interface IStoresService {
  list: () => Store[],
  create: (store: Omit<Store, 'id'>) => Store,
  update: (store: Store) => Store,
  byId: (id: number) => Store | undefined,
  del: (id: number) => void
}

class StoresService implements IStoresService {
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

    return this.byId(id) as Store;
  };

  update = (store: Store) => {
    this.stores = this.stores.map(
      curent => (curent.id === store.id ? store : curent),
    );

    return this.byId(store.id) as Store;
  };

  byId = (id: number) => this.stores.find(store => store.id === id);

  del = (id: number) => {
    this.stores = this.stores.filter(store => store.id !== id);
  };
}

export default StoresService;
