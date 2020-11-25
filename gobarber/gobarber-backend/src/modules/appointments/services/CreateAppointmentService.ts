import { startOfHour } from 'date-fns'
import { getCustomRepository, getRepository } from 'typeorm'
import AppError from '@shared/errors/AppError'
import Appointment from '@modules/appointments/infra/typeorm/entities/Appointment'
import User from '@modules/users/infra/typeorm/entities/User'
import AppointmentRepository from '../infra/typeorm/repositories/AppointmentRepository'


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
