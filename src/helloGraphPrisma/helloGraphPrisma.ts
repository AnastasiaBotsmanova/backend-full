import {PrismaClient} from '@prisma/client';
import {ApolloServer, gql} from 'apollo-server';
import {log} from '../log';

// yarn ts-node-dev src/helloGraphPrisma/helloGraphPrisma.ts

const typeDefs = gql`
  scalar Void

  type User {
    id: Int!
    name: String
    email: String!
  }

  type Query {
    user(id: Int!): User
    users: [User!]!
  }

  type Mutation {
    addUser(name: String, email: String!): User
    deleteUser(id: Int!): Void
    updateUser(id: Int!, name: String, email: String!): User
  }
`;

interface Context {
  user: string,
  prisma: PrismaClient
}

const resolvers = {
  Query: {
    user(_parent: any, args: any, context: Context, _info: any) {
      return context.prisma.user.findUnique({where: {id: args.id}});
    },
    users(_parent: any, _args: any, context: Context, _info: any) {
      return context.prisma.user.findMany();
    },
  },
  Mutation: {
    addUser(_parent: any, args: any, context: Context, _info: any) {
      return context.prisma.user.create({data: {
        name: args.name,
        email: args.email,
      }});
    },
    async deleteUser(_parent: any, args: any, context: Context, _info: any) {
      await context.prisma.user.delete({where: {
        id: args.id,
      }});
    },
    updateUser(_parent: any, args: any, context: Context, _info: any) {
      return context.prisma.user.update({
        where: {
          id: args.id,
        },
        data: {
          name: args.name,
          email: args.email,
        },
      });
    },
  },
};

const prisma = new PrismaClient();

async function start() {
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    csrfPrevention: true,
    cache: 'bounded',
    context: ({req}) => ({
      user: req.headers.user,
      prisma,
    }),
  });

  server.listen().then(({url}) => {
    log.info(`🚀  Server ready at ${url}`);
  });
}

start()
  .catch((error) => {
    throw error;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
