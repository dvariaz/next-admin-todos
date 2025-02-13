'use server';
import { cookies } from 'next/headers';

export const getCookieCart = async (): Promise<{ [key: string]: number }> => {
  const cookieStore = await cookies();

  if (!cookieStore.has('shopping-cart')) return {}
  
  const cartCookie = cookieStore.get('shopping-cart');
  return JSON.parse(cartCookie?.value || '{}');
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
