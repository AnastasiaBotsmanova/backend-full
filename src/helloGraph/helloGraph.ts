import {ApolloServer, gql} from 'apollo-server';
import {log} from '../log';

// yarn ts-node-dev src/helloGraph/helloGraph.ts

const typeDefs = gql`
  type User {
    id: ID!
    name: String
  }

  type Library {
    branch: String!
    books: [Book!]
  }

  type Book {
    title: String!
    author: Author!
  }

  type Author {
    name: String!
  }

  type Query {
    user(id: ID!): User
    libraries: [Library]
  }
`;

const libraries = [
  {
    branch: 'downtown',
  },
  {
    branch: 'riverside',
  },
];

const books = [
  {
    title: 'The Awakening',
    author: 'Kate Chopin',
    branch: 'riverside',
  },
  {
    title: 'City of Glass',
    author: 'Paul Auster',
    branch: 'downtown',
  },
];

const users = [
  {
    id: '1',
    name: 'Elizabeth Bennet',
  },
  {
    id: '2',
    name: 'Fitzwilliam Darcy',
  },
];

const resolvers = {
  Query: {
    user(_parent: any, args: any, contextValue: any, _info: any) {
      log.info(contextValue);
      return users.find((user) => user.id === args.id);
    },
    libraries() {
      return libraries;
    },
  },
  Library: {
    books(parent: any) {
      return books.filter((book) => book.branch === parent.branch);
    },
  },
  Book: {
    author(parent: any) {
      return {
        name: parent.author,
      };
    },
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
  csrfPrevention: true,
  cache: 'bounded',
  context: ({req}) => ({
    user: req.headers.user,
  }),
});

server.listen().then(({url}) => {
  log.info(`🚀  Server ready at ${url}`);
});
