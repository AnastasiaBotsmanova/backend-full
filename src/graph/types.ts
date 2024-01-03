import {Container} from 'inversify';

export interface Context {
  user: string,
  container: Container,
}
