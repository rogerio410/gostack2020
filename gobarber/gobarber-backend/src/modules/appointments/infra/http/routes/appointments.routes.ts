import { Router } from 'express'

import ensureAuthenticated from '@modules/users/infra/http/middleware/ensureAuthenticated'
import AppointmentController from '../controllers/AppointmentController'

const routes = Router()
const appointmentController = new AppointmentController()

// only for auth user
routes.use(ensureAuthenticated)

routes.get('/', appointmentController.list)

routes.post('/', appointmentController.create)

export default routes
