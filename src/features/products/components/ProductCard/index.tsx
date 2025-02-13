'use client';

import clsx from 'clsx';
import Image from 'next/image';
import { IoAddCircleOutline, IoTrashOutline } from 'react-icons/io5';
import { Product } from '@/features/products/data/products';
import StarsRating from '@/features/shared/components/StarsRating';

interface IProps extends Product {
  className?: string;
  onAddToCart?: (productId: string) => void
  onRemoveFromCart?: (productId: string) => void
}

const ProductCard: React.FC<IProps> = ({ id, name, price, rating, image, className, onAddToCart, onRemoveFromCart }) => {
  const handleAddToCart = (evt: React.MouseEvent) => {
    evt.preventDefault();
    if (onAddToCart) onAddToCart(id);
  }

  const handleRemoveFromCart = (evt: React.MouseEvent) => {
    evt.preventDefault();
    if (onRemoveFromCart) onRemoveFromCart(id);
  }

  return (
    <div className={clsx("shadow rounded-2xl bg-gray-750 border-gray-100", className)}>
      <div className="p-4">
        <Image
          width={500}
          height={500}
          className="rounded-xl"
          src={image}
          alt="product image" />
      </div>

      <div className="px-5 pb-5">
        <a href="#">
          <h3 className="font-semibold text-xl tracking-tight">{name}</h3>
        </a>

        <StarsRating rating={rating} />

        <div className="flex items-center justify-between">
          <span className="text-3xl font-bold">
            ${price}
          </span>

          <div className="flex">
            <button
              className="cursor-pointer mr-2 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              onClick={handleAddToCart}>
              <IoAddCircleOutline size={25} />
            </button>
            <button
              className="cursor-pointer bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800"
              onClick={handleRemoveFromCart}>
              <IoTrashOutline size={20} />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductCard;
