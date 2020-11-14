import React from 'react'
import SignIn from './pages/SignIn'
import GlobalStyle from './styles/global'
// import SignIn from './pages/SignIn'

import { AuthProvider } from './hooks/AuthContext'

const App: React.FC = () => (
  <>
    <AuthProvider>
      <SignIn />
    </AuthProvider>

    <GlobalStyle />
  </>
)

export default App
