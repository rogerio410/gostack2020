import { injectable, inject } from 'tsyringe'
import { getDate, getDaysInMonth } from 'date-fns'
import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider'
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
    private appointmentRepository: IAppointmentRepository,

    @inject('CacheProvider')
    private cacheProvider: ICacheProvider
  ) { }

  public async execute({
    provider_id,
    month,
    year,
    day,
  }: IRequest): Promise<Appointment[]> {
    const cacheKey = `provider-appointments:${provider_id}:${year}-${month}-${day}`
    let appointments = await this.cacheProvider.recovery<Appointment[]>(
      cacheKey
    )

    if (!appointments) {
      appointments = await this.appointmentRepository.findAll({
        month,
        year,
        day,
        provider_id,
      })

      await this.cacheProvider.save(cacheKey, appointments)
    }

    return appointments
  }
}

export default ListProviderAppointmentsService
