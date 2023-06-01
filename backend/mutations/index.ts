import { graphQLSchemaExtension } from '@keystone-next/keystone/schema';
import addToCart from './addToCart';

// graphql tagged template literal for syntax highlighting below
const graphql = String.raw;

export const extendGraphqlSchema = graphQLSchemaExtension({
  typeDefs: graphql`
    type Mutation {
      addToCart(productId: ID): CartItem
    }
  `,
  resolvers: {
    Mutation: {
      addToCart,
    },
  },
});

export default extendGraphqlSchema;
