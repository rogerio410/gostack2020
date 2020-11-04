import { Router } from 'express'
import appointmentsRouter from './appointments.routes'

const routes = Router()

// all /appointsments routes are redirect to this router
routes.use('/appointments', appointmentsRouter)

export default routes