import { createAuth } from '@keystone-next/auth';
import { config, createSchema } from '@keystone-next/keystone/schema';
import { ProductImage } from './schemas/ProductImage';
import { User } from './schemas/User';
import 'dotenv/config';
import { Product } from './schemas/Product';
import {
  withItemData,
  statelessSessions,
} from '@keystone-next/keystone/session';

const databaseURL =
  process.env.DATABASE_URL || 'mongodb://localhost/keystone-rocks-reiki';

const sessionConfig = {
  maxAge: 60 * 60 * 24 * 360, // How long user stays signed in.
  secret: process.env.COOKIE_SECRET,
};

const { withAuth } = createAuth({
  listKey: 'User',
  identityField: 'email',
  secretField: 'password',
  initFirstItem: {
    fields: ['name', 'email', 'password'],
    // TODO add initial roles here
  },
});

export default withAuth(
  config({
    server: {
      cors: {
        origin: [process.env.FRONTEND_URL],
        credentials: true,
      },
    },
    db: {
      adapter: 'mongoose',
      url: databaseURL,
      // TODO: add data seeding here
    },
    lists: createSchema({
      // TODO: schema items go in here
      User,
      Product,
      ProductImage,
    }),
    ui: {
      // Show the UI only if pass this test.
      isAccessAllowed: ({ session }) => {
        return !!session?.data;
      },
    },
    session: withItemData(statelessSessions(sessionConfig), {
      User: 'id',
    }),
  })
);
