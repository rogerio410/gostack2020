import { Request, Response } from 'express'
import UpdateUserAvatarService from '@modules/users/services/UpdateUserAvatarService'
import { container } from 'tsyringe'


class UserAvatarController {
  public async update(request: Request, response: Response): Promise<Response> {
    const updateAvatarService = container.resolve(UpdateUserAvatarService)

    const user = await updateAvatarService.execute(
      {
        user_id: request.user.id,
        avatar_filename: request.file.filename
      })

    return response.json(user)
  }

}

export default UserAvatarController
