import React, { useState, useEffect } from 'react'

import './App.css'
import Header from './components/Header'
import backgroundImg from './assets/dino.jpg'
import api from './services/api'

function App() {
    const [projects, setProjects] = useState([])

    async function handleAddProject() {
        // setProjects([...projects, `New Project ${Date.now()}`])
        const response = await api.post('/repositories', {
            title: 'Vida Liquida',
            url: 'github.com/vidaliquida',
            techs: ['js']
        })

        const project = response.data
        setProjects([...projects, project])
    }

    useEffect(() => {
        api.get('/repositories').then(response => setProjects(response.data))
    }, [])

    return (
        <>
            <Header title="Home">
                <ul>
                    <li>Item 2</li>
                    <li>Item 3</li>
                </ul>
            </Header>

            <ul>
                {projects.map(project => <li key={project.id}>{project.title}</li>)}
            </ul>

            <button type="button" onClick={handleAddProject}>Add Project</button>
        </>
    )
}

export default App