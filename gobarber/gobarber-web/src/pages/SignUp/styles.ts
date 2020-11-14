import styled from 'styled-components'
import { shade } from 'polished'
import backgroundImg from '../../assets/sign-up-background.png'

export const Container = styled.div`
  height: 100vh;
  display: flex;
  align-items: stretch;
`

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  width: 100%;
  max-width: 600px;

  form {
    margin: 60px 0;
    width: 340px;
    text-align: center;

    h1 {
      margin-bottom: 24px;
    }

    a {
      color: #f4edeb;
      display: block;
      margin-top: 24px;
      text-decoration: none;
      transition: color 0.2;

      &:hover {
        color: ${shade(0.2, '#f4edeb')};
      }
    }
  }

  > a {
    color: #f4ede8;
    display: block;
    text-decoration: none;
    transition: color 0.2;
    display: flex;
    align-items: center;

    &:hover {
      color: ${shade(0.2, '#f4ede8')};
    }

    svg {
      margin-right: 16px;
    }
  }
`

export const Background = styled.div`
  flex: 1;
  background: url(${backgroundImg}) no-repeat center;
  background-size: cover;
`
