import ProductCard from '@/features/products/components/ProductCard';
import { products } from '@/features/products/data/products';
import { addProductToCart, removeProductFromCart } from '@/features/shopping-cart/actions/cart';

const DashboardProductsPage = () => {
  return (
    <div>
      <h1 className="mb-4 ">Products Page</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {
          products.map((product) => (
            <ProductCard
              key={product.id}
              className="max-w-sm"
              onAddToCart={addProductToCart}
              onRemoveFromCart={removeProductFromCart}
              {...product} />
          ))
        }
      </div>
    </div>
  )
}

export default DashboardProductsPage;
