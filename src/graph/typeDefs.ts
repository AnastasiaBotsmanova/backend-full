import {gql} from 'apollo-server-express';

const typeDefs = gql`
  scalar Void

  type User {
    id: Int!
    name: String
    email: String!
  }

  type Library {
    branch: String!
    books: [Book]!
  }

  type Book {
    title: String!
    author: Author!
  }

  type Author {
    name: String!
  }

  type Good {
  id: Int!
  title: String!
  }

  type Order {
  id: Int!
  goodId: Int!
  good: Good!
  storeId: Int!
  store: Store!
  quantity: Int!
  total: Int!
  }

  type Price {
  id: Int!
  goodId: Int!
  good: Good!
  storeId: Int!
  store: Store!
  amount: Int!
  }

  type Store {
  id: Int!
  title: String!
  }

  type Query {
    user(id: Int!): User
    users: [User!]!
    libraries: [Library]

    good(id: Int!): Good
    goods: [Good!]!

    store(id: Int!): Store
    stores: [Store!]!

    price(id: Int!): Price
    prices: [Price!]!

    order(id: Int!): Order
    orders: [Order!]!
  }

  type Mutation {
    addUser(name: String, email: String!): User
    deleteUser(id: Int!): Void
    updateUser(id: Int!, name: String, email: String!): User

    addGood(title: String!): Good
    deleteGood(id: Int!): Void
    updateGood(id: Int!, title: String!): Good

    addStore(title: String!): Store
    deleteStore(id: Int!): Void
    updateStore(id: Int!, title: String!): Store

    addPrice(goodId: Int!, storeId: Int!, amount: Int!): Price
    deletePrice(id: Int!): Void
    updatePrice(id: Int!, goodId: Int!, storeId: Int!, amount: Int!): Price

    addOrder(goodId: Int!, storeId: Int!, quantity: Int!): Order
    deleteOrder(id: Int!): Void
    updateOrder(id: Int!, goodId: Int!, storeId: Int!, quantity: Int!): Order
  }
`;

export default typeDefs;
