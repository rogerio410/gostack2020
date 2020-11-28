import { Router } from 'express'
import appointmentsRouter from '@modules/appointments/infra/http/routes/appointments.routes'
import usersRouter from '@modules/users/infra/http/routes/users.routes'
import authRouter from '@modules/users/infra/http/routes/auth.routes'
import passwordRouter from '@modules/users/infra/http/routes/password.routes'

const routes = Router()

// all /appointsments routes are redirect to this router
routes.use('/appointments', appointmentsRouter)
routes.use('/users', usersRouter)
routes.use('/auth', authRouter)
routes.use('/password', passwordRouter)

export default routes
