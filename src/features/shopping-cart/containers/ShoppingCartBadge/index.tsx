import { BiShoppingBag } from 'react-icons/bi';
import { getCookieCart } from '@/features/shopping-cart/actions/cart';

const ShoppingCartBadge = async () => {
  const shoppingCart = await getCookieCart();
  const productsCount = Object.values(shoppingCart).reduce((a, b) => a + b, 0);

  return (
    <div className="flex items-center gap-2 bg-gray-750 px-4 py-1 rounded-xl">
      <BiShoppingBag size={20}/>
      <span>{productsCount}</span>
    </div>
  )
}

export default ShoppingCartBadge;