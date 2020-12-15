import React, { ChangeEvent, useCallback, useRef } from 'react'
import { FiMail, FiLock, FiUser, FiArrowLeft, FiCamera } from 'react-icons/fi'
import { Form } from '@unform/web'
import { Link, useHistory } from 'react-router-dom'
import * as Yup from 'yup'
import { FormHandles } from '@unform/core'
import { Container, Content, AvatarInput } from './styles'

import Input from '../../components/Input'
import Button from '../../components/Button'
import getValidationErrors from '../../utils/getValidationErrors'
import api from '../../services/api'

import { useToast } from '../../context_hooks/ToastContext'
import { useAuth } from '../../context_hooks/AuthContext'

interface ProfileFormData {
  name: string
  email: string
  password: string
  old_password: string
  password_confirmation: string
}

const Profile: React.FC = () => {
  const formRef = useRef<FormHandles>(null)

  const { user, updateUser } = useAuth()
  const { addToast } = useToast()
  const history = useHistory()

  const handleSubmit = useCallback(
    async (data: ProfileFormData) => {
      try {
        formRef.current?.setErrors({})

        const schema = Yup.object().shape({
          name: Yup.string().required('Nome obrigatório'),
          email: Yup.string()
            .required('E-mail obrigatório')
            .email('Digite um email válido'),
          old_password: Yup.string(),
          password: Yup.string().when('old_password', {
            is: val => !!val.length,
            then: Yup.string().required('Campo obrigatório'),
            otherwise: Yup.string()
          }),
          password_confirmation: Yup.string()
            .when('old_password', {
              is: val => !!val.length,
              then: Yup.string().required('Campo obrigatório'),
              otherwise: Yup.string()
            })
            .oneOf([Yup.ref('password'), undefined], 'Confirmação incorreta!')
        })

        await schema.validate(data, {
          abortEarly: false
        })

        const { name, email, old_password } = data

        let response

        if (old_password) {
          response = await api.put('/profile', data)
        } else {
          const formData = { name, email }
          response = await api.put('/profile', formData)
        }
        // ESLint e Prettier nao deixam o código abaixo funcionar
        // const formData = {
        //   name,
        //   email,
        //   ...(old_password
        //     ? {
        //       old_password,
        //       password,
        //       password_confirmation
        //     }
        //     : {})
        // }

        updateUser(response.data)

        history.push('/dashboard')

        addToast({
          type: 'success',
          title: 'Perfil atualizado',
          description:
            'Suas informações de perfil foram atualizadas com sucesso'
        })

        history.push('/')
      } catch (error) {
        if (error instanceof Yup.ValidationError) {
          const errors = getValidationErrors(error)
          formRef.current?.setErrors(errors)
          return
        }

        addToast({
          type: 'error',
          title: 'Error na Atualização',
          description:
            'Ocorreu um erro ao atualizar seu perfil, verifique os dados'
        })
      }
    },
    [history, addToast]
  )

  const handleAvatarChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      if (e.target.files) {
        const data = new FormData()
        data.append('avatar', e.target.files[0])

        api.patch('/users/avatar', data).then(response => {
          updateUser(response.data)

          addToast({
            type: 'success',
            title: 'Avatar atualizado'
          })
        })
      }
    },
    [addToast, updateUser]
  )

  return (
    <Container>
      <header>
        <div>
          <Link to="/dashboard">
            <FiArrowLeft />
          </Link>
        </div>
      </header>
      <Content>
        <Form
          ref={formRef}
          initialData={{
            name: user.name,
            email: user.email
          }}
          onSubmit={handleSubmit}
        >
          <AvatarInput>
            <img src={user.avatar_url} alt={user.name} />
            <label htmlFor="avatar">
              <FiCamera />
              <input type="file" id="avatar" onChange={handleAvatarChange} />
            </label>
          </AvatarInput>
          <h1>Meu Perfil</h1>

          <Input name="name" icon={FiUser} placeholder="Seu Nome" />
          <Input name="email" icon={FiMail} type="email" placeholder="E-mail" />

          <Input
            containerStyle={{ marginTop: 24 }}
            name="old_password"
            icon={FiLock}
            type="password"
            placeholder="Senha atual"
          />

          <Input
            name="password"
            icon={FiLock}
            type="password"
            placeholder="Nova Senha"
          />

          <Input
            name="password_confirmation"
            icon={FiLock}
            type="password"
            placeholder="Confirmação de Senha"
          />

          <Button type="submit">Confirmar mudanças</Button>
        </Form>
      </Content>
    </Container>
  )
}

export default Profile
