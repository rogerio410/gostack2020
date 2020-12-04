import { Router } from 'express'
import { celebrate, Joi } from 'celebrate'

import ensureAuthenticated from '@modules/users/infra/http/middleware/ensureAuthenticated'
import AppointmentController from '../controllers/AppointmentController'
import ProviderAppointmentsController from '../controllers/ProviderAppointments'

const routes = Router()
const appointmentController = new AppointmentController()
const providerAppointmentsController = new ProviderAppointmentsController()

// only for auth user
routes.use(ensureAuthenticated)

routes.get('/', appointmentController.list)
routes.post(
  '/',
  celebrate({
    body: {
      provider_id: Joi.string().uuid().required(),
      date: Joi.date(),
    },
  }),
  appointmentController.create
)
routes.get('/me', providerAppointmentsController.index)

export default routes
