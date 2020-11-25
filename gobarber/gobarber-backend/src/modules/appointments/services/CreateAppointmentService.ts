import { startOfHour } from 'date-fns';
import { getRepository } from 'typeorm';
import AppError from '@shared/errors/AppError';
import Appointment from '../infra/typeorm/entities/Appointment';
import User from '@modules/users/infra/typeorm/entities/User';
import { IAppointmentRepository } from '../repositories/IAppointmentRepository';
import { inject, injectable } from 'tsyringe'

interface IRequest {
  provider_id: string
  date: Date
}

@injectable()
class CreateAppointmentService {

  constructor(@inject('AppointmentRepository') private repository: IAppointmentRepository) {
    this.repository = repository
  }

  public async execute({ provider_id, date }: IRequest): Promise<Appointment> {

    const appointmentDate = startOfHour(date)

    const findAppointmentInSameDate = await this.repository.findByDate(appointmentDate);

    if (findAppointmentInSameDate) {
      throw new AppError('There is already an appointment at this date');
    }

    // TODO: Solve this (Get User) maybe routes must send the user
    const provider = await getRepository(User).findOne({
      id: provider_id,
    })

    if (!provider) {
      throw new AppError('Provider not found');
    }

    const appointment = await this.repository.create({
      provider,
      date: appointmentDate,
    })

    return appointment;
  }
}

export default CreateAppointmentService;
