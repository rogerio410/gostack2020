import { useNavigation, useRoute } from '@react-navigation/native'
import React, { useCallback, useEffect, useState } from 'react'
import Icon from 'react-native-vector-icons/Feather'
import { useAuth } from '../../context_hooks/AuthContext'
import api from '../../services/api'
import DateTimePicker from "@react-native-community/datetimepicker";
import {
    Container,
    Header,
    BackButton,
    HeaderTitle,
    UserAvatar,
    ProvidersList,
    ProvidersListContainer,
    ProviderContainer,
    ProviderAvatar,
    ProviderName,
    Calendar,
    Title,
    OpenDatePickerButton,
    OpenDatePickerButtonText
} from './styles'
import { date } from 'yup'
import { Platform } from 'react-native'

export interface Provider {
    id: string
    name: string
    avatar_url: string
}

interface RouteParams {
    providerId: string
}

const CreateAppointment: React.FC = () => {

    const { user } = useAuth()
    const { goBack } = useNavigation()

    const route = useRoute()
    const routeParams = route.params as RouteParams

    const [showDatePicker, setShowDatePicker] = useState(false)
    const [providers, setProviders] = useState<Provider[]>([])
    const [selectedProviderId, setSelectedProviderId] = useState(routeParams.providerId)
    const [selectedDate, setSelectedDate] = useState(new Date())

    useEffect(() => {
        api.get('/providers').then(response => {
            setProviders(response.data)
        })
    }, [])

    const navigateBack = useCallback(() => {
        goBack()
    }, [goBack])

    const handleSelectProvider = useCallback((providerId: string) => {
        setSelectedProviderId(providerId)
    }, [])

    const handleToogleDatePicker = useCallback(() => {
        setShowDatePicker(state => !state)
    }, [])

    const handleDateChange = useCallback((event: any, date: Date | undefined) => {
        if (Platform.OS === 'android') {
            setShowDatePicker(state => !state)
        }

        if (date) {
            setSelectedDate(date)
        }
    }, [])

    return (
        <Container>
            <Header>
                <BackButton onPress={navigateBack}>
                    <Icon name="chevron-left" size={24} color="#999591" />
                </BackButton>

                <HeaderTitle>Cabeleireiros</HeaderTitle>

                <UserAvatar source={{ uri: user.avatar_url }} />
            </Header>


            <ProvidersListContainer>
                <ProvidersList
                    horizontal
                    showsVerticalScrollIndicator={false}
                    data={providers}
                    keyExtrator={provider => provider.id}
                    renderItem={({ item: provider }) => (
                        <ProviderContainer
                            onPress={() => { handleSelectProvider(provider.id) }}
                            selected={provider.id === selectedProviderId}
                        >
                            <ProviderAvatar source={{ uri: provider.avatar_url }} />
                            <ProviderName selected={provider.id === selectedProviderId}>{provider.name}</ProviderName>
                        </ProviderContainer>
                    )}
                />
            </ProvidersListContainer>
            <Calendar>
                <Title>Escolha a data</Title>
                <OpenDatePickerButton onPress={handleToogleDatePicker}>
                    <OpenDatePickerButtonText>Selecionar outra</OpenDatePickerButtonText>
                </OpenDatePickerButton>
                {showDatePicker && <DateTimePicker
                    value={selectedDate}
                    mode="date"
                    display="inline"
                    textColor="#f4ede8"
                    onChange={handleDateChange}
                />}
            </Calendar>
        </Container>
    )
}

export default CreateAppointment