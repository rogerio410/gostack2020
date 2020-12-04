import { celebrate, Joi } from 'celebrate'
import { Router } from 'express'
import ForgotPasswordController from '../controllers/ForgotPasswordController'
import ResetPasswordController from '../controllers/ResetPasswordController'

const routes = Router()

const forgotPasswordController = new ForgotPasswordController()
const resetPasswordController = new ResetPasswordController()

routes.post(
  '/forgot',
  celebrate({
    body: {
      email: Joi.string().email().required(),
    },
  }),
  forgotPasswordController.create
)
routes.post(
  '/reset',
  celebrate({
    body: {
      token: Joi.string().uuid().required(),
      password: Joi.string().required(),
      password_confirmation: Joi.string().required().valid(Joi.ref('password')),
    },
  }),
  resetPasswordController.create
)

export default routes
