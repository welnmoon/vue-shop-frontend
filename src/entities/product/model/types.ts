export const categories = [
  'Electronics',
  'Clothing',
  'Grocery',
  'Accessories',
  'Shoes',
  'Home',
  'Stationery',
  'Sport',
  'Beauty',
] as const

export type ProductCategories = (typeof categories)[number]
