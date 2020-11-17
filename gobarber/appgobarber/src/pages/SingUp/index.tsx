import React, { useCallback, useRef } from 'react'
import Icon from 'react-native-vector-icons/Feather'
import logoImg from '../../assets/logo.png'
import { Image, View, KeyboardAvoidingView, Platform, ScrollView, TextInput, Alert } from 'react-native'
import Input from '../../components/Input'
import Button from '../../components/Button'
import { Container, Title, BackToSignInButton, BackToSignInButtonText } from './styles'
import { useNavigation } from '@react-navigation/native'
import { Form } from '@unform/mobile'
import * as Yup from 'yup'
import getValidationErrors from '../../utils/getValidationErrors'
import { FormHandles } from '@unform/core'
import api from '../../services/api'

interface SignupFormData {
    nome: string
    email: string
    password: string
}

const SignUp: React.FC = () => {
    const navigation = useNavigation()
    const formRef = useRef<FormHandles>(null)
    const buttonRef = useRef(null)
    const emailInputRef = useRef<TextInput>(null)
    const passwordInputRef = useRef<TextInput>(null)

    const handleSignUp = useCallback(
        async (data: SignupFormData) => {
            try {
                formRef.current?.setErrors({})

                const schema = Yup.object().shape({
                    name: Yup.string().required('Nome obrigatório'),
                    email: Yup.string()
                        .required('E-mail obrigatório')
                        .email('Digite um email válido'),
                    password: Yup.string().min(6, 'Mínimo de 6 caracteres')
                })

                await schema.validate(data, {
                    abortEarly: false
                })

                await api.post('/users', data)

                Alert.alert('Cadastro realizado com sucesso',
                    'Você já pode fazer seu logon no GoBarber'
                )

                navigation.navigate('SignIn')
            } catch (error) {
                if (error instanceof Yup.ValidationError) {
                    const errors = getValidationErrors(error)
                    formRef.current?.setErrors(errors)
                    return
                }

                Alert.alert('Error no Cadastro',
                    'Ocorreu um erro ao fazer cadastro, verifique os dados'
                )
            }
        },
        [navigation]
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
                        <Title>Faça seu Cadastro</Title>
                    </View>

                    <Form onSubmit={handleSignUp} ref={formRef}>
                        <Input
                            autoCapitalize='words'
                            name="name"
                            icon="user"
                            placeholder="Nome"
                            returnKeyType="next"
                            onSubmitEditing={() => {
                                emailInputRef.current?.focus()
                            }} />

                        <Input
                            ref={emailInputRef}
                            keyboardType='email-address'
                            autoCorrect={false}
                            autoCapitalize='none'
                            name="email"
                            icon="mail"
                            placeholder="E-mail"
                            returnKeyType="next"
                            onSubmitEditing={() => {
                                passwordInputRef.current?.focus()
                            }} />

                        <Input
                            ref={passwordInputRef}
                            secureTextEntry
                            name="password"
                            icon="lock"
                            textContentType="newPassword"
                            placeholder="Senha"
                            returnKeyType="send"
                            onSubmitEditing={() => { formRef.current?.submitForm() }} />
                    </Form>

                    <Button onPress={() => { formRef.current?.submitForm() }}>Crie sua Conta</Button>

                </Container>
            </ScrollView>
        </KeyboardAvoidingView>
        <BackToSignInButton onPress={() => navigation.goBack()}>
            <Icon name="arrow-left" size={20} color="#fff" />
            <BackToSignInButtonText>Voltar para Logon</BackToSignInButtonText>
        </BackToSignInButton>
    </>)
}

export default SignUp