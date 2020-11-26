import { Request, Response } from 'express'
import AuthUserService from '@modules/users/services/AuthUserService'
import { container } from 'tsyringe'

class AuthController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { email, password } = request.body

    const authService = container.resolve(AuthUserService)

    const { user, token } = await authService.execute({ email, password })

    return response.json({ user, token })
  }
}

export default AuthController
