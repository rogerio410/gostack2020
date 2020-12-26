import React, { useCallback, useRef } from 'react'
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import { View, KeyboardAvoidingView, Platform, ScrollView, TextInput, Alert } from 'react-native'
import Input from '../../components/Input'
import Button from '../../components/Button'
import { Container, Title, UserAvatarButton, UserAvatar, BackButton } from './styles'
import { useNavigation } from '@react-navigation/native'
import { Form } from '@unform/mobile'
import * as Yup from 'yup'
import Icon from 'react-native-vector-icons/Feather'
import getValidationErrors from '../../utils/getValidationErrors'
import { FormHandles } from '@unform/core'
import api from '../../services/api'
import { useAuth } from '../../context_hooks/AuthContext'

interface ProfileFormData {
    name: string
    email: string
    password: string
    old_password: string
    password_confirmation: string
}

const Profile: React.FC = () => {
    const { user, updateUser } = useAuth()
    const navigation = useNavigation()
    const formRef = useRef<FormHandles>(null)
    const emailInputRef = useRef<TextInput>(null)
    const oldPasswordInputRef = useRef<TextInput>(null)
    const passwordInputRef = useRef<TextInput>(null)
    const confirmPasswordInputRef = useRef<TextInput>(null)

    const handleUpdateProfile = useCallback(
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

                updateUser(response.data)
                Alert.alert('Perfil atualizado com sucesso')

                navigation.goBack()
            } catch (error) {
                if (error instanceof Yup.ValidationError) {
                    const errors = getValidationErrors(error)
                    formRef.current?.setErrors(errors)
                    return
                }

                Alert.alert('Error na Atualização do Perfil',
                    'Ocorreu um erro ao atualizar perfil, verifique os dados'
                )
            }
        },
        [navigation, updateUser]
    )

    const handleUpdateAvatar = useCallback(() => {
        launchImageLibrary({
            mediaType: 'photo'
        }, response => {
            if (response.didCancel) {
                return
            }

            if (response.error) {
                Alert.alert('Erro ao selecionar foto', response.error);
                return
            }

            const data = new FormData()
            data.append('avatar', {
                uri: response.uri,
                name: `${user.id}.jpg`,
                type: 'image/jpeg',
            })

            api.patch('/users/avatar', data).then(apiResponse => {
                updateUser(apiResponse.data)

                Alert.alert('Avatar atualizado')
            })

        })
    }, [updateUser, user.id])

    const handleGoBack = useCallback(() => {
        navigation.goBack()
    }, [navigation])

    return (<>
        <KeyboardAvoidingView
            style={{ flex: 1 }}
            behavior={Platform.OS === 'ios' ? 'padding' : undefined}
            enabled
        >
            <ScrollView keyboardShouldPersistTaps="handled" contentContainerStyle={{ flex: 1 }}>
                <Container>
                    <BackButton onPress={handleGoBack}>
                        <Icon name="chevron-left" size={24} color="#999591" />
                    </BackButton>
                    <UserAvatarButton onPress={handleUpdateAvatar}>
                        <UserAvatar source={{ uri: user.avatar_url }} />
                    </UserAvatarButton>

                    <View>
                        <Title>Meu Perfil</Title>
                    </View>

                    <Form initialData={user} onSubmit={handleUpdateProfile} ref={formRef}>
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
                                oldPasswordInputRef.current?.focus()
                            }} />

                        <Input
                            ref={oldPasswordInputRef}
                            secureTextEntry
                            name="old_password"
                            icon="lock"
                            textContentType="newPassword"
                            placeholder="Senha atual"
                            returnKeyType="next"
                            containerStyle={{ marginTop: 16 }}
                            onSubmitEditing={() => { passwordInputRef.current?.focus() }} />

                        <Input
                            ref={passwordInputRef}
                            secureTextEntry
                            name="password"
                            icon="lock"
                            textContentType="newPassword"
                            placeholder="Nova Senha"
                            returnKeyType="next"
                            onSubmitEditing={() => { confirmPasswordInputRef.current?.focus() }} />

                        <Input
                            ref={confirmPasswordInputRef}
                            secureTextEntry
                            name="password_confirmation"
                            icon="lock"
                            textContentType="newPassword"
                            placeholder="Confirmar Senha"
                            returnKeyType="send"
                            onSubmitEditing={() => { formRef.current?.submitForm() }} />
                    </Form>

                    <Button onPress={() => { formRef.current?.submitForm() }}>Confirmar mudanças</Button>

                </Container>
            </ScrollView>
        </KeyboardAvoidingView>
    </>)
}

export default Profile