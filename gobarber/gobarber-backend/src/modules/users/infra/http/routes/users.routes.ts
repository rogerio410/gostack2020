import { Router } from 'express'
import multer from 'multer'
import ensureAuthenticated from '../middleware/ensureAuthenticated'
import CreateUserService from '@modules/users/services/CreateUserService'
import uploadConfig from '@config/upload'
import UpdateUserAvatarService from '@modules/users/services/UpdateUserAvatarService'
import UserRepository from '../../typeorm/repositories/UserRepository'
import { container } from 'tsyringe'

const routes = Router()

const upload = multer(uploadConfig)

routes.post('/', async (request, response) => {
  const { name, email, password } = request.body

  const createUser = container.resolve(CreateUserService)
  const user = await createUser.execute({ name, email, password })

  return response.json(user)
})

routes.patch('/avatar', ensureAuthenticated, upload.single('avatar'), async (request, response) => {

  const updateAvatarService = container.resolve(UpdateUserAvatarService)

  const user = await updateAvatarService.execute(
    {
      user_id: request.user.id,
      avatar_filename: request.file.filename
    })

  return response.json(user)

})

export default routes
