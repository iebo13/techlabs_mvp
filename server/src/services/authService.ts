import { User, type IUser } from '../models/index.js'
import { generateToken } from '../lib/jwt.js'
import { logger } from '../config/logger.js'

type LoginInput = {
  email: string
  password: string
}

type RegisterInput = {
  email: string
  password: string
  firstName?: string
  lastName?: string
}

type AuthResult = {
  user: IUser
  token: string
}

export const login = async (input: LoginInput): Promise<AuthResult> => {
  const { email, password } = input

  // Find user by email
  const user = await User.findOne({ email, isActive: true })

  if (!user) {
    logger.warn({ email }, 'Login attempt with non-existent email')
    throw new Error('Invalid credentials')
  }

  // Verify password
  const isPasswordValid = await user.comparePassword(password)

  if (!isPasswordValid) {
    logger.warn({ email }, 'Login attempt with invalid password')
    throw new Error('Invalid credentials')
  }

  // Generate JWT token
  const token = generateToken({
    id: user._id.toString(),
    email: user.email,
    role: user.role,
  })

  logger.info({ userId: user._id, email }, 'User logged in successfully')

  return { user, token }
}

export const register = async (input: RegisterInput): Promise<AuthResult> => {
  const { email, password, firstName, lastName } = input

  // Check if user already exists
  const existingUser = await User.findOne({ email })

  if (existingUser) {
    throw new Error('User already exists')
  }

  // Create new user
  const user = await User.create({
    email,
    password,
    firstName,
    lastName,
    role: 'user',
  })

  // Generate JWT token
  const token = generateToken({
    id: user._id.toString(),
    email: user.email,
    role: user.role,
  })

  logger.info({ userId: user._id, email }, 'User registered successfully')

  return { user, token }
}

export const getMe = async (userId: string): Promise<IUser> => {
  const user = await User.findById(userId)

  if (!user) {
    throw new Error('User not found')
  }

  return user
}
