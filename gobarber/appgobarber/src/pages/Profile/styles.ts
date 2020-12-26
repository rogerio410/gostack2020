import styled from 'styled-components/native'
import { getBottomSpace } from 'react-native-iphone-x-helper'
import { Platform } from 'react-native'

export const Container = styled.View`
    flex: 1;
    /* align-items: center; */
    justify-content: center;
    padding: 0 30px ${Platform.OS === 'android' ? 120 : 40}px;
`

export const BackButton = styled.TouchableOpacity`
    margin-top: 40px;
`

export const Title = styled.Text`
    font-size: 24px;
    color: #f3ede8;
    font-family:'RobotoSlab-Medium';
    margin: 24px 0;
`

export const UserAvatarButton = styled.TouchableOpacity`
    margin-top: 32px;
`

export const UserAvatar = styled.Image`
    width: 186px;
    height: 186px;
    border-radius: 98px;
    align-self: center;
`


