import { Router } from 'express'
import ensureAuthenticated from '@modules/users/infra/http/middleware/ensureAuthenticated'
import ProvidersController from '../controllers/ProvidersController'

const routes = Router()
const providersController = new ProvidersController()

// only for auth user
routes.use(ensureAuthenticated)

routes.get('/', providersController.index)

export default routes
