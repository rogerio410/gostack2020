import { celebrate, Joi } from 'celebrate'
import { Router } from 'express'
import ProfileController from '../controllers/ProfileController'
import ensureAuthenticated from '../middleware/ensureAuthenticated'

const routes = Router()
const profileController = new ProfileController()

routes.use(ensureAuthenticated)

routes.put(
  '/',
  celebrate({
    body: {
      nome: Joi.string().required(),
      email: Joi.string().email().required(),
      old_password: Joi.string(),
      password: Joi.string(),
      password_confirmation: Joi.string().valid(Joi.ref('password')),
    },
  }),
  profileController.update
)
routes.get('/', profileController.show)

export default routes
