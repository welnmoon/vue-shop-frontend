export interface PublicUserDto {
  id: string
  email: string
  createdAt: Date
}

export interface RegisterDto {
  email: string
  password: string
}
