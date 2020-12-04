import { Router } from 'express'
import ensureAuthenticated from '@modules/users/infra/http/middleware/ensureAuthenticated'
import { celebrate, Joi } from 'celebrate'
import ProvidersController from '../controllers/ProvidersController'
import ProviderMonthAvailabilityController from '../controllers/ProviderMonthAvailabilityController'
import ProviderDayAvailabilityController from '../controllers/ProviderDayAvailabilityController'

const routes = Router()
const providersController = new ProvidersController()
const monthAvailabilityController = new ProviderMonthAvailabilityController()
const dayAvailabilityController = new ProviderDayAvailabilityController()

// only for auth user
routes.use(ensureAuthenticated)

routes.get('/', providersController.index)
routes.get(
  '/:provider_id/month-availability',
  celebrate({
    params: {
      provider_id: Joi.string().uuid().required(),
    },
  }),
  monthAvailabilityController.index
)
routes.get('/:provider_id/day-availability', dayAvailabilityController.index)

export default routes
