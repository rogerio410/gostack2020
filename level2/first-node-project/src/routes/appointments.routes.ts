import { startOfHour, parseISO } from 'date-fns'
import { Router } from 'express'
import AppointmentRepository from '../repositories/AppointmentRepository'

const routes = Router()
// all routes are under '/appointments' path
const AppointmentRepo = new AppointmentRepository()

routes.get('/', (request, response) => {
    return response.json(AppointmentRepo.all())
})

routes.post('/', (request, response) => {
    const { provider, date } = request.body

    const parsedDate = startOfHour(parseISO(date))

    const findAppointmentInSameDate = AppointmentRepo.findByDate(parsedDate)

    if (findAppointmentInSameDate) {
        return response.status(400).json({ message: 'There is already an appointment at this date' })
    }

    const appointment = AppointmentRepo.create(provider, parsedDate)

    return response.json(appointment)
})

export default routes