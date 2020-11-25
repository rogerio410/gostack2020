import { parseISO } from 'date-fns'
import { Router } from 'express'
import { getCustomRepository } from 'typeorm'
import CreateAppointmentService from '@modules/appointments/services/CreateAppointmentService'
import AppointmentRepository from '@modules/appointments/infra/typeorm/repositories/AppointmentRepository'
import ensureAuthenticated from '@modules/users/infra/http/middleware/ensureAuthenticated'

const routes = Router()
// all routes are under '/appointments' path

// only for auth user
routes.use(ensureAuthenticated)


routes.get('/', async (request, response) => {
    const appointmentRepo = getCustomRepository(AppointmentRepository)
    return response.json(await appointmentRepo.find())
})

routes.post('/', async (request, response) => {
    const { provider_id, date } = request.body

    const parsedDate = parseISO(date)

    const createAppointmentService = new CreateAppointmentService()
    const appointment = await createAppointmentService.execute({
        provider_id, date: parsedDate
    })
    return response.json(appointment)

})

export default routes