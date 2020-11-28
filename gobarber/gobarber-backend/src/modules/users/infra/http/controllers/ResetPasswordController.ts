import ResetPasswordService from '@modules/users/services/ResetPasswordService'
import { Request, Response } from 'express'
import { container } from 'tsyringe'

class ResetPasswordController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { password, token } = request.body

    const forgotPasswordService = container.resolve(ResetPasswordService)

    await forgotPasswordService.execute({ token, password })

    return response.status(204).json()
  }
}

export default ResetPasswordController
