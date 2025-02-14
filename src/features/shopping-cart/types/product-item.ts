import { Product } from '@/features/products/data/products';

export interface ProductCartItem extends Product {
  quantity: number;
}
