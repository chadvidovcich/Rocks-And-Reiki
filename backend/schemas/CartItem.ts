import { integer, relationship } from '@keystone-next/fields';
import { list } from '@keystone-next/keystone/schema';

// eslint-disable-next-line import/prefer-default-export
export const CartItem = list({
  ui: {
    listView: {
      initialColumns: ['user', 'product', 'quantity'],
    },
  },
  fields: {
    // TODO: custom label
    quantity: integer({
      defaultValue: 1,
      isRequired: true,
    }),
    product: relationship({ ref: 'Product' }),
    user: relationship({ ref: 'User.cart' }),
  },
});
