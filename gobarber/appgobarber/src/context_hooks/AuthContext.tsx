import React, { createContext, useCallback, useContext, useEffect, useState } from 'react'
import AsyncStorage from '@react-native-community/async-storage'
import api from '../services/api'

interface AuthState {
  token: string
  user: object
}

interface SignInCredentials {
  email: string
  password: string
}

interface AuthContextData {
  user: object
  signIn(credentials: SignInCredentials): Promise<void>
  signOut(): void
  loading: boolean
}

// Context
const AuthContext = createContext<AuthContextData>({} as AuthContextData)

// Provider
export const AuthProvider: React.FC = ({ children }) => {
  const [data, setData] = useState<AuthState>({} as AuthState)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadStorageData = async (): Promise<void> => {
      const token = await AsyncStorage.getItem('@GoBarber:token')
      const user = await AsyncStorage.getItem('@GoBarber:user')

      if (token && user) {
        setData({ token, user: JSON.parse(user) })
      }

      setLoading(false)
    }

    loadStorageData()
  }, [])

  const signIn = useCallback(async ({ email, password }) => {
    const response = await api.post('/auth', { email, password })

    const { token, user } = response.data

    // await AsyncStorage.setItem('@GoBarber:token', token)
    // await AsyncStorage.setItem('@GoBarber:user', JSON.stringify(user))

    await AsyncStorage.multiSet([
      ['@GoBarber:token', token],
      ['@GoBarber:user', JSON.stringify(user)]
    ])

    setData({ token, user })
  }, [])

  const signOut = useCallback(async () => {
    // await AsyncStorage.removeItem('@GoBarber:token')
    // await AsyncStorage.removeItem('@GoBarber:user')

    await AsyncStorage.multiRemove([
      '@GoBarber:token', '@GoBarber:user'
    ])

    setData({} as AuthState)
  }, [])

  return (
    <AuthContext.Provider value={{ user: data.user, signIn, signOut, loading }}>
      {children}
    </AuthContext.Provider>
  )
}

// Hook to expose AuthContext Data
export function useAuth(): AuthContextData {
  const context = useContext(AuthContext)

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }

  return context
}
