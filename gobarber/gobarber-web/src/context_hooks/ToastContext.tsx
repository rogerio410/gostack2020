import React, { createContext, useCallback, useContext, useState } from 'react'
import { uuid } from 'uuidv4'
import ToastContainer from '../components/ToastContainer'

export interface ToastMessage {
  id: string
  type: 'success' | 'info' | 'error'
  title: string
  description?: string
}

interface ToastContextData {
  addToast(message: Omit<ToastMessage, 'id'>): void
  removeToast(id: string): void
}

const ToastContext = createContext<ToastContextData>({} as ToastContextData)

const ToastProvider: React.FC = ({ children }) => {
  const [messages, setMessages] = useState<ToastMessage[]>([])

  const addToast = useCallback(
    ({ type, description, title }: Omit<ToastMessage, 'id'>) => {
      const id = uuid()

      const toastMessage = {
        id,
        type,
        title,
        description
      }

      // setMessages([...messages, toastMessage])
      setMessages(oldState => [...oldState, toastMessage])
    },
    []
  )

  const removeToast = useCallback((id: string) => {
    // setMessages([...messages, ...])
    setMessages(state => state.filter(message => message.id !== id))
  }, [])

  return (
    <ToastContext.Provider value={{ addToast, removeToast }}>
      {children}
      <ToastContainer messages={messages} />
    </ToastContext.Provider>
  )
}

function useToast(): ToastContextData {
  const context = useContext(ToastContext)

  if (!context) {
    throw new Error('useToast must be within a ToastContext')
  }

  return context
}

export { ToastProvider, useToast }
