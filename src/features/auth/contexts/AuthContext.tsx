import React, { createContext, type ReactNode, useState, useEffect, useContext } from 'react'
import { authApi } from '@/lib/api'

type User = {
  _id: string
  email: string
  role: 'admin' | 'user'
  firstName?: string
  lastName?: string
  isActive: boolean
}

type AuthContextType = {
  user: User | null
  loading: boolean
  error: string | null
  signIn: (email: string, password: string) => Promise<void>
  signOut: () => Promise<void>
  clearError: () => void
  isAuthenticated: boolean
  isAdmin: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

type AuthProviderProps = {
  children: ReactNode
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Check if user is already authenticated on mount
  useEffect(() => {
    const checkAuth = async (): Promise<void> => {
      const token = localStorage.getItem('authToken')

      if (!token) {
        setLoading(false)
        return
      }

      try {
        const response = await authApi.getMe()

        setUser(response.data)
      } catch (err) {
        // Token is invalid or expired
        authApi.logout()
      } finally {
        setLoading(false)
      }
    }

    checkAuth()
  }, [])

  const signIn = async (email: string, password: string): Promise<void> => {
    setError(null)
    setLoading(true)

    try {
      const response = await authApi.login(email, password)

      setUser(response.data.user)
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to sign in'

      setError(errorMessage)
      throw err
    } finally {
      setLoading(false)
    }
  }

  const signOut = async (): Promise<void> => {
    setError(null)

    try {
      authApi.logout()
      setUser(null)
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to sign out'

      setError(errorMessage)
      throw err
    }
  }

  const clearError = (): void => {
    setError(null)
  }

  const value: AuthContextType = {
    user,
    loading,
    error,
    signIn,
    signOut,
    clearError,
    isAuthenticated: !!user,
    isAdmin: user?.role === 'admin',
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext)

  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }

  return context
}
