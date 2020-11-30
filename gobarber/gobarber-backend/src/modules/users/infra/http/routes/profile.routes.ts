import { Router } from 'express'
import ProfileController from '../controllers/ProfileController'
import ensureAuthenticated from '../middleware/ensureAuthenticated'

const routes = Router()
const profileController = new ProfileController()

routes.use(ensureAuthenticated)

routes.put('/', profileController.update)
routes.get('/', profileController.show)

export default routes
