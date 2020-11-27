import { startOfHour } from 'date-fns'
import { getRepository } from 'typeorm'
import AppError from '@shared/errors/AppError'
import User from '@modules/users/infra/typeorm/entities/User'
import { inject, injectable } from 'tsyringe'
import Appointment from '../infra/typeorm/entities/Appointment'
import IAppointmentRepository from '../repositories/IAppointmentRepository'

interface IRequest {
  provider: User
  date: Date
}

@injectable()
class CreateAppointmentService {
  constructor(
    @inject('AppointmentRepository') private repository: IAppointmentRepository
  ) {
    // TODO: this line it's unnecessary, it's here just by prettier
    this.repository = repository
  }

  public async execute({ provider, date }: IRequest): Promise<Appointment> {
    const appointmentDate = startOfHour(date)

    const findAppointmentInSameDate = await this.repository.findByDate(
      appointmentDate
    )

    if (findAppointmentInSameDate) {
      throw new AppError('There is already an appointment at this date')
    }

    const appointment = await this.repository.create({
      provider,
      date: appointmentDate,
    })

    return appointment
  }
}

export default CreateAppointmentService
