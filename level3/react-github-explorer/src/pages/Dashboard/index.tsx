import React, { FormEvent, useEffect, useState } from 'react'
import { FiChevronRight } from 'react-icons/fi'
import { Link } from 'react-router-dom'
import { Title, Form, Repositories, Error } from './styles'

import api from '../../services/api'

import logo from '../../assets/images/logo-ge.svg'

interface Repository {
  full_name: string
  description: string
  owner: {
    login: string
    avatar_url: string
  }
  html_url: string
}

const Dashboard: React.FC = () => {
  const [repositories, setRepositories] = useState<Repository[]>(() => {
    const storagedRepositories = localStorage.getItem(
      '@GithubExplorer:repositories'
    )

    if (storagedRepositories) {
      return JSON.parse(storagedRepositories)
    }

    return []
  })
  const [newRepo, setNewRepo] = useState('')
  const [inputError, setInputError] = useState('')

  useEffect(() => {
    localStorage.setItem(
      '@GithubExplorer:repositories',
      JSON.stringify(repositories)
    )
  }, [repositories])

  async function handleAddRepository(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    if (!newRepo) {
      setInputError('Digite autor/repositório corretamente')
      return
    }

    try {
      const response = await api.get<Repository>(`repos/${newRepo}`)

      setRepositories([...repositories, response.data])

      setNewRepo('')
      setInputError('')
    } catch {
      setInputError('Erro na busca. Verifique usuario/repositório')
    }
  }

  return (
    <>
      <img src={logo} alt="Github Explorer" />
      <Title>Explore Repositório no Github</Title>

      <Form hasError={!!inputError} onSubmit={handleAddRepository}>
        <input
          placeholder="Digite aqui o nome do Repositório"
          value={newRepo}
          onChange={e => setNewRepo(e.target.value)}
        />
        <button type="submit">Pesquisar</button>
      </Form>

      {inputError && <Error>{inputError}</Error>}

      <Repositories>
        {repositories.map(repository => (
          <Link
            key={repository.full_name}
            to={`/repository/${repository.full_name}`}
          >
            <img
              src={repository.owner.avatar_url}
              alt={repository.owner.login}
            />
            <div>
              <strong>{repository.full_name}</strong>
              <p>{repository.description}</p>
            </div>

            <FiChevronRight size={20} />
          </Link>
        ))}
      </Repositories>
    </>
  )
}

export default Dashboard
