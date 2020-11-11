import styled from 'styled-components'
import { shade } from 'polished'

interface FormProps {
  hasError: boolean
}

export const Title = styled.h1`
  font-size: 48px;
  color: #3a3a3a;
  margin-top: 40px;
  max-width: 450px;
  line-height: 56px;
`

export const Form = styled.form<FormProps>`
  margin-top: 30px;
  max-width: 700px;
  display: flex;

  input {
    flex: 1;
    height: 70px;
    padding: 0 24px;
    border: 0;
    border-radius: 10px 0 0 10px; /* tl tr br bl */
    color: #3a3a3a;
    border: 2px solid #fff;

    &:placeholder {
      color: #a8a8b3;
    }
  }

  button {
    width: 200px;
    height: 70px;
    background: #04d361;
    border-radius: 0 10px 10px 0; /* tl tr br bl */
    border: 0;
    color: #fff;
    font-weight: bold;
    transition: background-color 0.4s;

    &:hover {
      background: ${shade(0.12, '#04d361')};
    }
  }
`

export const Error = styled.span`
  display: block;
  color: #c53030;
  margin-top: 8px;
`

export const Repositories = styled.div`
  margin-top: 40px;
  max-width: 700px;

  a {
    background: #fff;
    border-radius: 10px;
    width: 100%;
    padding: 24px;
    display: block;
    text-decoration: none;

    display: flex;
    align-items: center;

    transition: transform 0.1s;

    & + a {
      margin-top: 10px;
    }

    &:hover {
      transform: translateX(10px);
    }

    img {
      height: 64px;
      width: 64px;
      border-radius: 50%;
    }

    div {
      margin: 0 12px;
      flex: 1;

      strong {
        font-size: 20px;
        color: #3d3d4d;
      }

      p {
        font-size: 18px;
        color: #a8a8b3;
        margin-top: 4px;
      }
    }

    svg {
      margin-left: auto;
      color: #cbcbd6;
    }
  }
`
