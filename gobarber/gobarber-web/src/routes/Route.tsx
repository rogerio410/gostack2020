import React from 'react'
import {
  Route as ReactRouteDOM,
  RouteProps as ReactRouteDOMProps,
  Redirect
} from 'react-router-dom'

import { useAuth } from '../context_hooks/AuthContext'

interface RouterProps extends ReactRouteDOMProps {
  isPrivate?: boolean
  component: React.ComponentType
}

const Route: React.FC<RouterProps> = ({
  isPrivate = false,
  component: Component,
  ...props
}) => {
  const { user } = useAuth()

  const isSignin = !!user

  function handleRender(location: any) {
    if (isPrivate === isSignin) {
      return <Component />
    }
    return (
      <Redirect
        to={{
          pathname: isPrivate ? '/' : '/dashboard',
          state: { from: location }
        }}
      />
    )
  }

  return (
    <ReactRouteDOM
      {...props}
      render={({ location }) => handleRender(location)}
    />
  )
}

export default Route
