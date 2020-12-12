import React, { useCallback, useRef } from 'react'
import { FiLock } from 'react-icons/fi'
import { FormHandles } from '@unform/core'
import { Form } from '@unform/web'
import { useHistory, useLocation } from 'react-router-dom'
import * as Yup from 'yup'
import logoImg from '../../assets/logo.svg'
import { Container, AnimationContainer, Content, Background } from './styles'

import Input from '../../components/Input'
import Button from '../../components/Button'
import getValidationErrors from '../../utils/getValidationErrors'
import { useToast } from '../../context_hooks/ToastContext'
import api from '../../services/api'

interface SignInFormData {
  password: string
  password_confirmation: string
}

const SignIn: React.FC = () => {
  const formRef = useRef<FormHandles>(null)

  const { addToast } = useToast()
  const history = useHistory()
  const location = useLocation()

  const handleSubmit = useCallback(
    async (data: SignInFormData) => {
      try {
        formRef.current?.setErrors({})

        const schema = Yup.object().shape({
          password: Yup.string().min(4, 'Senha Obrigatória'),
          password_confirmation: Yup.string().oneOf(
            [Yup.ref('password'), undefined],
            'Senhas divergem. Verifique'
          )
        })

        await schema.validate(data, {
          abortEarly: false
        })

        const token = location.search.replace('?token=', '')

        if (!token) {
          throw new Error()
        }

        // ResetPassword
        await api.post('password/reset', {
          password: data.password,
          password_confirmation: data.password_confirmation,
          token
        })

        // redirect to Login
        history.push('/')
      } catch (error) {
        if (error instanceof Yup.ValidationError) {
          const errors = getValidationErrors(error)
          formRef.current?.setErrors(errors)
          return
        }

        addToast({
          type: 'error',
          title: 'Error ao Resetar a senha',
          description: 'Ocorreu um erro ao resetar sua senha, tente novamente'
        })
      }
    },
    [addToast, history, location.search]
  )

  return (
    <Container>
      <Content>
        <AnimationContainer>
          <img src={logoImg} alt="GoBarber" />

          <Form ref={formRef} onSubmit={handleSubmit}>
            <h1>Resetar senha</h1>

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
              placeholder="Confirmação Senha"
            />

            <Button type="submit">Alterar Senha</Button>
          </Form>
        </AnimationContainer>
      </Content>
      <Background />
    </Container>
  )
}

export default SignIn
