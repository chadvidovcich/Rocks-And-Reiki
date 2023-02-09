import Pagination from '../../components/Pagination';
import Products from '../../components/Products';
import { useRouter } from '../../node_modules/next/dist/client/router';

export default function ProductsPage() {
  const { query } = useRouter();
  const page = parseInt(query.page);
  return (
    <div>
      <Pagination page={page || 1} />
      <Products />
      <Pagination page={page || 1} />
    </div>
  );
}
