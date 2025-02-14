'use client';

import clsx from 'clsx';
import { ProductCartItem } from '@/features/shopping-cart/types/product-item';

interface IProps extends ProductCartItem {
  className?: string;
  onQuantityChange?: (nextValue: number) => Promise<void>;
}

const ProductItemCard: React.FC<IProps> = ({ name, price, quantity, image, className, onQuantityChange }) => {
  const total = quantity * price;

  const handleIncrement = (evt: React.MouseEvent) => {
    evt.preventDefault();
    if (onQuantityChange) onQuantityChange(quantity + 1);
  }

  const handleDecrement = (evt: React.MouseEvent) => {
    evt.preventDefault();
    if (onQuantityChange) onQuantityChange(quantity - 1);
  }

  return (
    <div className={clsx("flex items-center bg-gray-800 p-4 rounded-lg border border-gray-750 shadow", className)}>
      <div className="w-24 h-24 rounded-lg overflow-hidden">
        <img
          src={image}
          alt={`${name} product cover`}
          className="w-full h-full object-cover" />
      </div>

      <div className="p-4 flex flex-col flex-1">
        <h3 className="font-medium">{name} - ${price}</h3>
        <span>Quantity: {quantity}</span>
        <span>Total: ${total}</span>
      </div>

      <div className="flex flex-col md:flex-row items-center gap-2">
        <button className="px-4 py-2 bg-blue-800 hover:bg-blue-700 rounded-lg cursor-pointer" onClick={handleIncrement}>+</button>
        <span className="mx-2 w-10 text-center">{quantity}</span>
        <button className="px-4 py-2 bg-red-700 hover:bg-red-600 rounded-lg cursor-pointer" onClick={handleDecrement}>-</button>
      </div>
    </div>
  )
}

export default ProductItemCard;
