import { injectable, inject } from 'tsyringe'
import { getDate, getDaysInMonth } from 'date-fns'
import IAppointmentRepository from '../repositories/IAppointmentRepository'
import Appointment from '../infra/typeorm/entities/Appointment'

interface IRequest {
  provider_id: string
  month: number
  year: number
  day: number
}

@injectable()
class ListProviderAppointmentsService {
  constructor(
    @inject('AppointmentRepository')
    private appointmentRepository: IAppointmentRepository
  ) { }

  public async execute({
    provider_id,
    month,
    year,
    day,
  }: IRequest): Promise<Appointment[]> {
    const appointments = await this.appointmentRepository.findAll({
      month,
      year,
      day,
      provider_id,
    })

    return appointments
  }
}

export default ListProviderAppointmentsService
