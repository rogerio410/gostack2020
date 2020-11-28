import { Router } from 'express'
import multer from 'multer'
import uploadConfig from '@config/upload'

import ensureAuthenticated from '../middleware/ensureAuthenticated'
import UserController from '../controllers/UserController'
import UserAvatarController from '../controllers/UserAvatarController'

const routes = Router()
const userController = new UserController()
const userAvatarController = new UserAvatarController()

const upload = multer(uploadConfig)

routes.post('/', userController.create)

routes.patch(
  '/avatar',
  ensureAuthenticated,
  upload.single('avatar'),
  userAvatarController.update
)

export default routes
