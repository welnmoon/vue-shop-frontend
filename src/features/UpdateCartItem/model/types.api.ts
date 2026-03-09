export type UpdateCartItemDto = {
  quantity: number
}

export type UpdateCartItemParams = {
  itemId: string
  dto: UpdateCartItemDto
}
