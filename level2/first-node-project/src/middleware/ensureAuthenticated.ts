import { Request, Response, NextFunction } from 'express'
import { verify } from 'jsonwebtoken'
import authConfig from '../config/auth'

interface TokenPayload {
    iat: number,
    exp: number,
    sub: string,
}


function ensureAuthenticated(
    request: Request,
    response: Response,
    next: NextFunction
): void {

    const authHeader = request.headers.authorization

    if (!authHeader) {
        throw new Error('JWT is missing')
    }

    const [, token] = authHeader.split(" ")

    try {
        const tokenDecoded = verify(token, authConfig.jwt.secret)

        const { sub } = tokenDecoded as TokenPayload

        request.user = {
            id: sub
        }

        return next()
    } catch (err) {
        throw new Error('Invalid token!')
    }

    return
}

export default ensureAuthenticated