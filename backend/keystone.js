import 'dotenv/config';
import { createAuth } from '@keystone-next/auth';
import { config, createSchema } from '@keystone-next/keystone/schema';
import {
  withItemData,
  statelessSessions,
} from '@keystone-next/keystone/session';
import { User } from './schemas/User';
import { Product } from './schemas/Product';
import { ProductImage } from './schemas/ProductImage';
import { insertSeedData } from './seed-data';

const __awaiter =
  (this && this.__awaiter) ||
  function (thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P
        ? value
        : new P((resolve) => {
            resolve(value);
          });
    }
    return new (P || (P = Promise))((resolve, reject) => {
      function fulfilled(value) {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      }
      function rejected(value) {
        try {
          step(generator.throw(value));
        } catch (e) {
          reject(e);
        }
      }
      function step(result) {
        result.done
          ? resolve(result.value)
          : adopt(result.value).then(fulfilled, rejected);
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
  };

const databaseURL =
  process.env.DATABASE_URL || 'mongodb://localhost/keystone-rocks-reiki';
const sessionConfig = {
  maxAge: 60 * 60 * 24 * 360,
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
      onConnect(keystone) {
        return __awaiter(this, void 0, void 0, function* () {
          if (process.argv.includes('--seed-data')) {
            yield insertSeedData(keystone);
          }
        });
      },
    },
    lists: createSchema({
      // TODO: schema items go in here
      User,
      Product,
      ProductImage,
    }),
    ui: {
      // Show the UI only if pass this test.
      isAccessAllowed: ({ session }) =>
        !!(session === null || session === void 0 ? void 0 : session.data),
    },
    session: withItemData(statelessSessions(sessionConfig), {
      User: 'id',
    }),
  })
);
