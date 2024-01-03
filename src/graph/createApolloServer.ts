import {ApolloServer} from 'apollo-server-express';
import typeDefs from './typeDefs';
import resolvers from './resolvers';
import container from '../services/container';

const createApolloServer = () => {
  return new ApolloServer({
    typeDefs,
    resolvers,
    csrfPrevention: true,
    cache: 'bounded',
    context: ({req}) => ({
      user: req.headers.user,
      container,
    }),
  });
};

export default createApolloServer;
