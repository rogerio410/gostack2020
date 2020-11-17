import React from 'react'
import AuthRoutes from './auth.routes'
import AppRoutes from './app.routes'

import { useAuth } from '../context_hooks/AuthContext'
import { ActivityIndicator, View } from 'react-native'

const Routes: React.FC = () => {

    const { user, loading } = useAuth()

    console.log('loading', loading)

    if (loading) {
        return (
            <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                <ActivityIndicator size="large" color="#999" />
            </View>)
    }

    return user ? <AppRoutes /> : < AuthRoutes />
}

export default Routes