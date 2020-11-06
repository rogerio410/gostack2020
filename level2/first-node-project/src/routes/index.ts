import { Router } from 'express'
import appointmentsRouter from './appointments.routes'
import usersRouter from './users.routes'

const routes = Router()

// all /appointsments routes are redirect to this router
routes.use('/appointments', appointmentsRouter)
routes.use('/users', usersRouter)

export default routes