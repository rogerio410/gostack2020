import { startOfHour } from 'date-fns'
import { getCustomRepository } from 'typeorm'
import Appointment from '../models/Appointment'
import AppointmentRepository from '../repositories/AppointmentRepository'


interface Request {
    provider: string
    date: Date
}

class CreateAppointmentService {

    public async execute({ provider, date }: Request): Promise<Appointment> {
        const repository = getCustomRepository(AppointmentRepository)

        const appointmentDate = startOfHour(date)

        const findAppointmentInSameDate = await repository.findByDate(appointmentDate)

        if (findAppointmentInSameDate) {
            throw Error('There is already an appointment at this date')
        }

        const appointment = repository.create({
            provider,
            date: appointmentDate
        })

        await repository.save(appointment)

        return appointment
    }
}


export default CreateAppointmentService