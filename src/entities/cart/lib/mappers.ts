import type { LocalCartItem } from '@/app/stores/types'
import type { CartLine } from '../model/types'
import type { CartItem, MergeCartDto, MergeCartItemDto } from '../model/types.api'

export const mapServerCartItemToCartLine = (item: CartItem): CartLine => {
  return {
    productId: item.productId,
    title: item.product.title,
    description: item.product.description,
    price: item.product.price,
    image: item.product.image,
    category: item.product.category,
    quantity: item.quantity,
    itemId: item.id,
  }
}

export const mapServerCartItemsToCartLines = (items: CartItem[]): CartLine[] => {
  return items.map(mapServerCartItemToCartLine)
}

export const mapLocalCartItemToCartLine = (item: LocalCartItem): CartLine => {
  return {
    productId: item.productId,
    title: item.title,
    description: item.description,
    price: item.price,
    image: item.image,
    category: item.category,
    quantity: item.quantity,
  }
}

export const mapLocalCartItemsToCartLines = (items: LocalCartItem[]): CartLine[] => {
  return items.map(mapLocalCartItemToCartLine)
}

export const mapCartLineToMergedCartItem = (item: CartLine): MergeCartItemDto => {
  return {
    productId: item.productId,
    quantity: item.quantity,
  }
}

export const mapCartLinesToMergeCartDto = (items: CartLine[]): MergeCartDto => {
  return {
    items: items.map(mapCartLineToMergedCartItem),
  }
}
