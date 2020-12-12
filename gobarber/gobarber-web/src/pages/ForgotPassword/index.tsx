import React, { useCallback, useRef, useState } from 'react'
import { FiLogIn, FiMail } from 'react-icons/fi'
import { FormHandles } from '@unform/core'
import { Form } from '@unform/web'
import * as Yup from 'yup'
import logoImg from '../../assets/logo.svg'
import { Container, AnimationContainer, Content, Background } from './styles'

import Input from '../../components/Input'
import Button from '../../components/Button'
import getValidationErrors from '../../utils/getValidationErrors'
import { useToast } from '../../context_hooks/ToastContext'
import api from '../../services/api'

interface ForgotPasswordFormData {
  email: string
}

const ForgotPassword: React.FC = () => {
  const [loading, setLoading] = useState(false)
  const formRef = useRef<FormHandles>(null)

  const { addToast } = useToast()

  const handleSubmit = useCallback(
    async (data: ForgotPasswordFormData) => {
      try {
        setLoading(true)
        formRef.current?.setErrors({})

        const schema = Yup.object().shape({
          email: Yup.string()
            .required('E-mail obrigatório')
            .email('Digite um email válido')
        })

        await schema.validate(data, {
          abortEarly: false
        })
        // recovery passqord
        await api.post('/password/forgot', {
          email: data.email
        })

        addToast({
          type: 'success',
          title: 'Email de recuperação enviado',
          description:
            'Enviamos um email para confirmar a recuperação de senha, verifique sua caixa de entrada'
        })

        // redirect to Dashboard
        // history.push('/dashboard')
      } catch (error) {
        if (error instanceof Yup.ValidationError) {
          const errors = getValidationErrors(error)
          formRef.current?.setErrors(errors)
          return
        }

        addToast({
          type: 'error',
          title: 'Error na Recuperação de Senha',
          description:
            'Ocorreu um erro ao tentar realizar a recuperação de senha, tente novamente!'
        })
      } finally {
        setLoading(false)
      }
    },
    [addToast]
  )

  return (
    <Container>
      <Content>
        <AnimationContainer>
          <img src={logoImg} alt="GoBarber" />

          <Form ref={formRef} onSubmit={handleSubmit}>
            <h1>Recuperar senha</h1>
            <Input
              name="email"
              icon={FiMail}
              type="email"
              placeholder="E-mail"
            />

            <Button loading={loading} type="submit">
              Entrar
            </Button>
          </Form>

          <a href="/">
            <FiLogIn />
            Voltar ao login
          </a>
        </AnimationContainer>
      </Content>
      <Background />
    </Container>
  )
}

export default ForgotPassword
