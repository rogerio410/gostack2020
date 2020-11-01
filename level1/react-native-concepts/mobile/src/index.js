import React, { useState, useEffect } from 'react'
import { View, Text, FlatList, StatusBar, SafeAreaView, StyleSheet, TouchableOpacity } from 'react-native'
import api from './services/api'

export default function app() {

    const [repositories, setRepositories] = useState([])

    useEffect(() => {
        api.get('/repositories').then(response => {
            setRepositories(response.data)
            console.log('result', response.data)
        })
    }, [])

    async function handleAddProject() {
        const response = await api.post('/repositories', {
            title: `New Project ${Date.now()}`,
            url: 'githut.com/new',
            tech: ['python', 'js']
        })

        setRepositories([...repositories, response.data])
    }

    return (
        <>
            <StatusBar barStyle='light-content' />

            <SafeAreaView style={styles.container}>
                <FlatList
                    style={styles.container}
                    data={repositories}
                    keyExtractor={repo => repo.id}
                    renderItem={({ item: repo }) => (
                        <Text style={styles.project} > { repo.title}</Text>
                    )}
                />

                <TouchableOpacity
                    activeOpacity={0.6}
                    style={styles.button}
                    onPress={handleAddProject}
                >
                    <Text styles={styles.buttonText}>Add Project</Text>
                </TouchableOpacity>
            </SafeAreaView>

            {/* <View style={styles.container}>
                <Text style={styles.title}>GoStack Projects.</Text>
                {repositories.map(repo => {
                    return (
                        <Text key={repo.id} style={styles.project}>{repo.title}</Text>
                    )
                })}
            </View> */}
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#7159c1',
        // justifyContent: 'center',
        // alignItems: 'center',
    },
    title: {
        fontSize: 45,
        fontWeight: 'bold',
        color: '#fff',
        marginBottom: 35,
    },
    project: {
        fontSize: 18,
        fontWeight: '600',
        color: '#fff',
        marginBottom: 40
    },
    button: {
        backgroundColor: '#fff',
        height: 50,
        margin: 20,
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonText: {
        fontWeight: 'bold',
    }
})