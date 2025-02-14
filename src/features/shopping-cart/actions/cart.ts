'use server';
import { cookies } from 'next/headers';
import { ProductCartItem } from '@/features/shopping-cart/types/product-item';
import { products } from '@/features/products/data/products';

export const getCookieCart = async (): Promise<{ [key: string]: number }> => {
  const cookieStore = await cookies();

  if (!cookieStore.has('shopping-cart')) return {}
  
  const cartCookie = cookieStore.get('shopping-cart');
  return JSON.parse(cartCookie?.value || '{}');
}

export const getPopulatedProductsInCart = async (): Promise<ProductCartItem[]> => {
  const cart = await getCookieCart();

  return products.filter(product => cart[product.id]).map((product) => ({
    ...product,
    quantity: cart[product.id]
  }));
}

export const getTotalProductsCountInCart = async (): Promise<number> => {
  const cart = await getCookieCart();
  return Object.values(cart).reduce((a, b) => a + b, 0);
}

export const addProductToCart = async (productId: string): Promise<{ [key: string]: number }> => {
  const cart = await getCookieCart();
  cart[productId] = (cart[productId] || 0) + 1;
  const cookieStore = await cookies();
  cookieStore.set('shopping-cart', JSON.stringify(cart));

  return cart;
}

export const removeProductFromCart = async (productId: string): Promise<{ [key: string]: number }> => {
  const cart = await getCookieCart();
  delete cart[productId];
  const cookieStore = await cookies();
  cookieStore.set('shopping-cart', JSON.stringify(cart));

  return cart;
}

export const changeProductQuantity = async (productId: string, quantity: number): Promise<{ [key: string]: number }> => {
  if (quantity <= 0) return removeProductFromCart(productId);

  const cookieStore = await cookies();
  const cart = await getCookieCart();
  cart[productId] = quantity;
  cookieStore.set('shopping-cart', JSON.stringify(cart));

  return cart;
}
