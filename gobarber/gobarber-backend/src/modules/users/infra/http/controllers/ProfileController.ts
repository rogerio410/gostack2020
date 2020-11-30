import ShowProfileService from '@modules/users/services/ShowProfileService'
import UpdateUserProfileService from '@modules/users/services/UpdateUserProfileService'
import { Request, Response } from 'express'
import { container } from 'tsyringe'

class ProfileController {
  public async show(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id
    const showProfileController = container.resolve(ShowProfileService)

    const user = await showProfileController.execute({ user_id })

    delete user.password

    return response.json(user)
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id
    const { name, email, password, old_password } = request.body

    const updateProfileController = container.resolve(UpdateUserProfileService)
    const user = await updateProfileController.execute({
      user_id,
      name,
      email,
      password,
      old_password,
    })

    delete user.password
    return response.json(user)
  }
}

export default ProfileController
