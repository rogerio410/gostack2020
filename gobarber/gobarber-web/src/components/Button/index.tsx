import React, { ButtonHTMLAttributes } from 'react'

import { Container } from './style'

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement>

const Button: React.FC<ButtonProps> = ({ children }, type, ...props) => (
  <Container type={type} {...props}>
    {children}
  </Container>
)

export default Button
