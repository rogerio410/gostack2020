import React, {
  InputHTMLAttributes,
  useCallback,
  useEffect,
  useRef,
  useState
} from 'react'
import { IconBaseProps } from 'react-icons'

import { useField } from '@unform/core'

import { Container } from './style'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string
  icon?: React.ComponentType<IconBaseProps>
}

const Input: React.FC<InputProps> = ({ name, icon: Icon, ...props }) => {
  const inputRef = useRef<HTMLInputElement>(null)
  const { fieldName, defaultValue, error, registerField } = useField(name)
  const [isFocused, setIsFocused] = useState(false)
  const [isFilled, setisFilled] = useState(false)

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef.current,
      path: 'value'
    })
  }, [fieldName, registerField])

  const handleInputBlur = useCallback(() => {
    setIsFocused(false)

    // if (inputRef.current?.value) {
    //   setisFilled(true)
    // }
    setisFilled(!!inputRef.current?.value)
  }, [])

  const handleInputFocus = useCallback(() => {
    setIsFocused(true)
  }, [])

  return (
    <Container isFocused={isFocused} isFilled={isFilled}>
      {Icon && <Icon size={20} />}
      <input
        onFocus={handleInputFocus}
        onBlur={handleInputBlur}
        ref={inputRef}
        {...props}
      />
    </Container>
  )
}

export default Input
