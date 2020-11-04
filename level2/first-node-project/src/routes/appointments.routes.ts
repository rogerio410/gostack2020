import { parseISO } from 'date-fns'
import { Router } from 'express'
import CreateAppointmentService from '../services/CreateAppointmentService'
import AppointmentRepository from '../repositories/AppointmentRepository'

const routes = Router()
// all routes are under '/appointments' path
const appointmentRepo = new AppointmentRepository()
const createAppointmentService = new CreateAppointmentService(appointmentRepo)

routes.get('/', (request, response) => {
    return response.json(appointmentRepo.all())
})

routes.post('/', (request, response) => {
    const { provider, date } = request.body

    const parsedDate = parseISO(date)

    try {
        const appointment = createAppointmentService.execute({
            provider, date: parsedDate
        })
        return response.json(appointment)
    } catch (error) {
        return response.status(400).json({ message: error.message })
    }

})

export default routes