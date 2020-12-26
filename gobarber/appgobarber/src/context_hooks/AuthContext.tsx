import React, { createContext, useCallback, useContext, useEffect, useState } from 'react'
import AsyncStorage from '@react-native-community/async-storage'
import api from '../services/api'

interface AuthState {
  token: string
  user: User
}

interface SignInCredentials {
  email: string
  password: string
}

interface User {
  id: string
  name: string
  email: string
  avatar_url: string
}

interface AuthContextData {
  user: User
  signIn(credentials: SignInCredentials): Promise<void>
  signOut(): void
  updateUser(user: User): Promise<void>
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
        api.defaults.headers.authorization = `Bearer ${token}`
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

    api.defaults.headers.authorization = `Bearer ${token}`

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

  const updateUser = useCallback(
    async (user: User) => {
      await AsyncStorage.setItem('@GoBarber:user', JSON.stringify(user))

      setData({
        token: data.token,
        user
      })
    },
    [setData, data.token]
  )

  return (
    <AuthContext.Provider value={{ user: data.user, signIn, signOut, updateUser, loading }}>
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
