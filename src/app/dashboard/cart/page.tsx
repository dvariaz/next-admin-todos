import { changeProductQuantity, getPopulatedProductsInCart, getTotalProductsCountInCart } from '@/features/shopping-cart/actions/cart';
import Invoice from '@/features/shopping-cart/components/Invoice';
import ProductItemCard from '@/features/shopping-cart/components/ProductItemCard';

export async function generateMetadata() {
  const productsCount = await getTotalProductsCountInCart();

  return {
    title: `Shopping Cart (${productsCount})`,
    description: 'Products in Shopping Cart',
  }
}

const DashboardCartPage = async () => {
  const products = await getPopulatedProductsInCart();

  const totalAmount = products.reduce((a, b) => a + b.price * b.quantity, 0);
  const taxes = totalAmount * 0.15;
  const totalToPay = totalAmount + taxes;

  return (
    <div>
      <h1 className="mb-4 text-lg font-medium">Products in Shopping Cart</h1>

      <div className="grid grid-cols-10 gap-8">
        <div className="col-span-10 lg:col-span-6 flex flex-col gap-4 md:max-w-3xl">
          {
            products.map((product) => (
              <ProductItemCard
                key={product.id}
                {...product}
                onQuantityChange={async (newValue: number) => {
                  'use server';
                  await changeProductQuantity(product.id, newValue);
                }} />
            ))
          }
        </div>

        <div className="col-span-10 lg:col-span-4">
          <div className="flex justify-center">
            <Invoice totalToPay={totalToPay} taxes={taxes} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default DashboardCartPage;
