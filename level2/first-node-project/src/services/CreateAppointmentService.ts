import { startOfHour } from 'date-fns'
import Appointment from '../models/Appointment'
import AppointmentRepository from '../repositories/AppointmentRepository'


interface Request {
    provider: string
    date: Date
}

class CreateAppointmentService {
    private repository: AppointmentRepository

    constructor(repository: AppointmentRepository) {
        this.repository = repository
    }

    public execute({ provider, date }: Request): Appointment {

        const appointmentDate = startOfHour(date)
        const findAppointmentInSameDate = this.repository.findByDate(appointmentDate)

        if (findAppointmentInSameDate) {
            throw Error('There is already an appointment at this date')
        }

        const appointment = this.repository.create({
            provider,
            date: appointmentDate
        })

        return appointment
    }
}


export default CreateAppointmentService