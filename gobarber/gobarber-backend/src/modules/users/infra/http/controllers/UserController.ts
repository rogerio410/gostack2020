import { Request, Response } from 'express'
import CreateUserService from '@modules/users/services/CreateUserService'
import { container } from 'tsyringe'

class UserController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { name, email, password } = request.body

    const createUser = container.resolve(CreateUserService)
    const user = await createUser.execute({ name, email, password })

    return response.json(user)
  }
}

export default UserController
