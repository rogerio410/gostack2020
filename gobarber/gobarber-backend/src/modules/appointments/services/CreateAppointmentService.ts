import { format, getHours, isBefore, startOfHour } from 'date-fns'
import { getRepository } from 'typeorm'
import AppError from '@shared/errors/AppError'
import User from '@modules/users/infra/typeorm/entities/User'
import { inject, injectable } from 'tsyringe'
import INotificationsRepository from '@modules/notifications/repositories/INotificationsRepository'
import Appointment from '../infra/typeorm/entities/Appointment'
import IAppointmentRepository from '../repositories/IAppointmentRepository'

interface IRequest {
  provider_id: string
  user_id: string
  date: Date
}

@injectable()
class CreateAppointmentService {
  constructor(
    @inject('AppointmentRepository') private repository: IAppointmentRepository,
    @inject('NotificationsRepository')
    private notificationRepository: INotificationsRepository
  ) { }

  public async execute({
    provider_id,
    user_id,
    date,
  }: IRequest): Promise<Appointment> {
    const appointmentDate = startOfHour(date)

    if (isBefore(appointmentDate, Date.now())) {
      throw new AppError("You can't book an appointment on past")
    }

    if (provider_id === user_id) {
      throw new AppError("You can't book a service with yourself")
    }

    if (getHours(appointmentDate) < 8 || getHours(appointmentDate) > 17) {
      throw new AppError("You can't book a service at this time")
    }

    const findAppointmentInSameDate = await this.repository.findByDate(
      appointmentDate
    )

    if (findAppointmentInSameDate) {
      throw new AppError('There is already an appointment at this date')
    }

    const provider = new User()
    provider.id = provider_id

    const user = new User()
    user.id = user_id

    const appointment = await this.repository.create({
      provider_id: provider.id,
      user_id: user.id,
      date: appointmentDate,
    })

    const dateFormatted = format(appointmentDate, "dd/MM/yyyy 'às' HH:mm")

    await this.notificationRepository.create({
      recipient_id: provider_id,
      content: `Novo agendamento para ${dateFormatted}`,
    })

    return appointment
  }
}

export default CreateAppointmentService
