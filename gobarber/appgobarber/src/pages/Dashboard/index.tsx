import React from 'react'
import { View, Button } from 'react-native'

import { useAuth } from '../../context_hooks/AuthContext'

const Dashboard: React.FC = () => {

    const { signOut } = useAuth()
    return (
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }} >
            <Button title="Sair" onPress={signOut} />
        </ View >
    )
}

export default Dashboard