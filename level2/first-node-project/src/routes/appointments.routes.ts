import { parseISO } from 'date-fns'
import { Router } from 'express'
import CreateAppointmentService from '../services/CreateAppointmentService'
import AppointmentRepository from '../repositories/AppointmentRepository'
import { getCustomRepository } from 'typeorm'
import ensureAuthenticated from '../middleware/ensureAuthenticated'

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
    try {
        const appointment = await createAppointmentService.execute({
            provider_id, date: parsedDate
        })
        return response.json(appointment)
    } catch (error) {
        return response.status(400).json({ message: error.message })
    }

})

export default routes