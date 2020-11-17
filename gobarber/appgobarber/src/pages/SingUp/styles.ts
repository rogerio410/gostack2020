import styled from 'styled-components/native'
import { getBottomSpace } from 'react-native-iphone-x-helper'
import { Platform } from 'react-native'

export const Container = styled.View`
    flex: 1;
    align-items: center;
    justify-content: center;
    padding: 0 30px ${Platform.OS === 'android' ? 120 : 40}px;
`

export const Title = styled.Text`
    font-size: 24px;
    color: #f3ede8;
    font-family:'RobotoSlab-Medium';
    margin: 64px 0 24px;
`
export const BackToSignInButton = styled.TouchableOpacity`
    position: absolute;
    left: 0;
    bottom: 0px;
    right: 0;
    background: #312e38;
    border-top-width: 1px;
    border-top-color: #232129;
    padding: 16px 0 ${16 + getBottomSpace()}px;

    flex-direction: row;
    align-items: center;
    justify-content: center
`

export const BackToSignInButtonText = styled.Text`
    color: #fff;
    font-size: 18px;
    margin-left: 8px;
    font-family: 'RobotoSlab-Regular';
`

