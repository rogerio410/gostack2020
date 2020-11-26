import { Request, Response, NextFunction } from 'express'
import { verify } from 'jsonwebtoken'
import authConfig from '@config/auth'
import AppError from '@shared/errors/AppError'

interface TokenPayload {
  iat: number
  exp: number
  sub: string
}

function ensureAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction,
): void {
  const authHeader = request.headers.authorization

  if (!authHeader) {
    throw new AppError('JWT is missing', 401)
  }

  const [, token] = authHeader.split(' ')

  try {
    const tokenDecoded = verify(token, authConfig.jwt.secret)

    const { sub } = tokenDecoded as TokenPayload

    request.user = {
      id: sub,
    }

    return next()
  } catch (err) {
    throw new AppError('Invalid token!')
  }

  // return
}

export default ensureAuthenticated
