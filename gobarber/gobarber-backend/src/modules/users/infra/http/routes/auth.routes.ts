import { celebrate, Joi } from 'celebrate'
import { Router } from 'express'
import AuthController from '../controllers/AuthController'

const routes = Router()
const authController = new AuthController()

routes.post(
  '/',
  celebrate({
    body: {
      email: Joi.string().email().required(),
      password: Joi.string().required(),
    },
  }),
  authController.create
)

export default routes
