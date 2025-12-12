export type UserRole = 'admin'

export type UserClaims = {
  sub: string
  email: string
  role: UserRole
}
