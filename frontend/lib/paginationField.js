import { PAGINATION_QUERY } from '../components/Pagination';

export default function paginationField() {
  return {
    keyArgs: false,
    read(existing = [], { args, cache }) {
      const { skip, first } = args;

      // read the number of items on the page
      const data = cache.readQuery({ query: PAGINATION_QUERY });
      const count = data?._allProductsMeta?.count;
      const page = skip / first + 1;
      const pages = Math.ceil(count / first);

      // check if we have existing items
      const items = existing.slice(skip, skip + first).filter((x) => x);
      // there are items on the last page, but not enough to fill a page fully
      if (items.length && items.length !== first && page === pages) {
        return items;
      }
      // we don't have any items. Need to fetch from network
      if (items.length !== first) {
        return false;
      }
      // we have items. return them from cache
      if (items.length) {
        console.log(
          `There are ${items.length} items in cache. Sending them to Apollo`
        );
        return items;
      }

      return false; // fallback to network
    },
    merge(existing = [], incoming, { args }) {
      const { skip } = args;
      console.log(`Merging ${incoming.length} items from the network`);
      const merged = existing ? existing.slice(0) : [];
      for (let i = skip; i < skip + incoming.length; ++i) {
        merged[i] = incoming[i - skip];
      }
      return merged;
    },
  };
}
