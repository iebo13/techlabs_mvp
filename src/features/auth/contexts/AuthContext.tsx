import React, { createContext, type ReactNode, useEffect, useContext, useState } from 'react'
import { clearAuthToken, getAuthToken, setAuthToken } from '@/config/authToken'
import { getMe, login } from '../api/authApi'
import type { AuthUser } from '../types/auth.types'

type AuthContextType = {
  user: AuthUser | null
  loading: boolean
  error: string | null
  signIn: (email: string, password: string) => Promise<void>
  signOut: () => Promise<void>
  clearError: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

type AuthProviderProps = {
  children: ReactNode
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<AuthUser | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const token = getAuthToken()

    if (!token) {
      setLoading(false)

      return
    }

    const run = async (): Promise<void> => {
      try {
        const me = await getMe()

        setUser(me.user)
      } catch {
        clearAuthToken()
        setUser(null)
      } finally {
        setLoading(false)
      }
    }

    void run()
  }, [])

  const signIn = async (email: string, password: string): Promise<void> => {
    setError(null)
    setLoading(true)

    try {
      const res = await login(email, password)

      setAuthToken(res.token)
      setUser(res.user)
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to sign in'

      setError(errorMessage)
      throw err
    } finally {
      setLoading(false)
    }
  }

  const signOut = (): Promise<void> => {
    setError(null)

    try {
      clearAuthToken()
      setUser(null)
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to sign out'

      setError(errorMessage)

      return Promise.reject(err)
    }

    return Promise.resolve()
  }

  const clearError = (): void => {
    setError(null)
  }

  const value: AuthContextType = { user, loading, error, signIn, signOut, clearError }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext)

  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }

  return context
}
