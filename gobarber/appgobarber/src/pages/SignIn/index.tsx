import React, { useCallback, useRef } from 'react'
import Icon from 'react-native-vector-icons/Feather'
import logoImg from '../../assets/logo.png'
import { Image, View, KeyboardAvoidingView, Platform, ScrollView, TextInput, Alert } from 'react-native'
import Input from '../../components/Input'
import Button from '../../components/Button'
import { useNavigation } from '@react-navigation/native'
import { FormHandles } from '@unform/core'
import { Form } from '@unform/mobile'
import * as Yup from 'yup'
import { useAuth } from '../../context_hooks/AuthContext'
import getValidationErrors from '../../utils/getValidationErrors'
import { Container, Title, ForgotPassword, ForgotPasswordText, CreateAccountButtonText, CreateAccountButton } from './styles'

interface SignInFormData {
    email: string
    password: string
}

const SignIn: React.FC = () => {
    const navigation = useNavigation()
    const formRef = useRef<FormHandles>(null)
    const passwordInputRef = useRef<TextInput>(null)

    const { signIn, user } = useAuth()

    const handleSigIn = useCallback(
        async (data: SignInFormData) => {
            try {
                formRef.current?.setErrors({})

                const schema = Yup.object().shape({
                    email: Yup.string()
                        .required('E-mail obrigatório')
                        .email('Digite um email válido'),
                    password: Yup.string().min(4, 'Senha Obrigatória')
                })

                await schema.validate(data, {
                    abortEarly: false
                })

                // validation OK
                await signIn({ email: data.email, password: data.password })


            } catch (error) {
                if (error instanceof Yup.ValidationError) {
                    const errors = getValidationErrors(error)
                    formRef.current?.setErrors(errors)
                    return
                }

                Alert.alert('Error na Autenticação', 'Ocorreu um erro ao fazer login, verifique as credenciais'
                )

            }
        },
        [SignIn]
    )

    return (<>
        <KeyboardAvoidingView
            style={{ flex: 1 }}
            behavior={Platform.OS === 'ios' ? 'padding' : undefined}
            enabled
        >
            <ScrollView keyboardShouldPersistTaps="handled" contentContainerStyle={{ flex: 1 }}>
                <Container>
                    <Image source={logoImg} />
                    {/* To fix animation on open keybord */}
                    <View>
                        <Title>Faça seu Logon</Title>
                    </View>

                    <Form ref={formRef} onSubmit={handleSigIn}>
                        <Input
                            autoCorrect={false}
                            autoCapitalize='none'
                            keyboardType='email-address'
                            name="email"
                            icon="mail"
                            placeholder="E-mail"
                            returnKeyType="next"
                            onSubmitEditing={() => { passwordInputRef.current?.focus() }}
                        />
                        <Input
                            ref={passwordInputRef}
                            name="password"
                            icon="lock"
                            placeholder="Senha"
                            returnKeyType="send"
                            textContentType="newPassword"
                            secureTextEntry
                            onSubmitEditing={() => { formRef.current?.submitForm() }} />
                    </Form>

                    <Button onPress={() => { formRef.current?.submitForm() }}>Entrar</Button>

                    <ForgotPassword>
                        <ForgotPasswordText>Esqueci minha senha</ForgotPasswordText>
                    </ForgotPassword>


                </Container>
            </ScrollView>
        </KeyboardAvoidingView>
        <CreateAccountButton onPress={() => { navigation.navigate('SignUp') }}>
            <Icon name="log-in" size={20} color="#ff9000" />
            <CreateAccountButtonText>Criar uma Conta</CreateAccountButtonText>
        </CreateAccountButton>
    </>)
}

export default SignIn