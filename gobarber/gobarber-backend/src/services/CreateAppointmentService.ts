import { startOfHour } from 'date-fns'
import { getCustomRepository, getRepository } from 'typeorm'
import AppError from '../errors/AppError'
import Appointment from '../models/Appointment'
import User from '../models/User'
import AppointmentRepository from '../repositories/AppointmentRepository'


interface Request {
    provider_id: string
    date: Date
}

class CreateAppointmentService {

    public async execute({ provider_id, date }: Request): Promise<Appointment> {
        const repository = getCustomRepository(AppointmentRepository)

        const appointmentDate = startOfHour(date)

        const findAppointmentInSameDate = await repository.findByDate(appointmentDate)

        if (findAppointmentInSameDate) {
            throw new AppError('There is already an appointment at this date')
        }

        const provider = await getRepository(User).findOne({
            id: provider_id
        })

        if (!provider) {
            throw new AppError('Provider not found')
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