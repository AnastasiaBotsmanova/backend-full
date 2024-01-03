import {injectable} from 'inversify';
import 'reflect-metadata';

export interface Film {
  id: number,
  title: string,
  rating: number,
}

export interface IFilmsService {
  [x: string]: any;
  list: () => Film[],
  create: (film: Omit<Film, 'id'>) => Film,
  update: (film: Film) => Film,
  byId: (id: number) => Film | undefined,
  del: (id: number) => void,
}

@injectable()
class FilmsService implements IFilmsService {
  films: Film[] = [
    {
      id: 1,
      title: 'Аватар',
      rating: 10,
    },
    {
      id: 2,
      title: 'Атака титанов',
      rating: 9,
    },
    {
      id: 3,
      title: 'Алиса в стране чудес',
      rating: 8,
    },
  ];

  list = () => this.films;

  create = (film: Omit<Film, 'id'>) => {
    const maxId = Math.max(...this.films.map(film => film.id));
    const id = maxId + 1;

    this.films.push({
      ...film,
      id,
    });

    return this.byId(id) as Film;
  };

  update = (film: Film) => {
    this.films = this.films.map(
      curent => (curent.id === film.id ? film : curent),
    );

    return this.byId(film.id) as Film;
  };

  byId = (id: number) => this.films.find(film => film.id === id);

  del = (id: number) => {
    this.films = this.films.filter(film => film.id !== id);
  };
}

export default FilmsService;
