export interface PublicUserDto {
  id: string
  email: string
  createdAt: Date
}

export interface LoginDto {
  email: string
  password: string
}
