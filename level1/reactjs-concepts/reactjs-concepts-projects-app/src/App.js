import React, { useState, useEffect } from "react";
import api from "./services/api";

import "./styles.css";

function App() {

  const [repositories, setRepositories] = useState([])
  const [title, setTitle] = useState('')
  const [url, setUrl] = useState('')
  const [techs, setTechs] = useState('')

  useEffect(() => {
    api.get('/repositories').then(response => {
      setRepositories(response.data)
    })
  }, [])

  async function handleAddRepository(e) {
    e.preventDefault()
    const repo = { title, url, techs }
    api.post('/repositories', repo).then(response => {
      setRepositories([...repositories, response.data])
    }).catch(error => {
      alert(error)
    })
  }

  async function handleRemoveRepository(id) {
    api.delete(`/repositories/${id}`).then(response => {
      if (response.status === 204) {
        const repoIndex = repositories.findIndex(repo => {
          return repo.id === id
        })

        repositories.splice(repoIndex, 1)

        setRepositories([...repositories])
      }
    })
  }

  return (
    <div>
      <ul data-testid="repository-list">

        {repositories.map(repo => {
          return (
            <li key={repo.id}>
              {repo.title}

              <button onClick={() => handleRemoveRepository(repo.id)}>
                Remover
              </button>
            </li>
          )
        })}


      </ul>

      <form>
        <input
          id="title"
          value={title}
          placeholder="Repository title"
          onChange={e => setTitle(e.target.value)} />

        <input
          id="url"
          value={url}
          placeholder="Repository URL"
          onChange={e => setUrl(e.target.value)}
        />

        <input
          id="techs"
          value={techs}
          placeholder="Used Techs"
          onChange={e => setTechs(e.target.value)} />

        <button onClick={handleAddRepository}>Adicionar</button>
      </form>
    </div>
  );
}

export default App;
