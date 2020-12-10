import { injectable, inject } from 'tsyringe'
import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider'
import { classToClass } from 'class-transformer'
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

    // let appointments

    if (!appointments) {
      appointments = await this.appointmentRepository.findAll({
        month,
        year,
        day,
        provider_id,
      })

      appointments = classToClass(appointments)

      await this.cacheProvider.save(cacheKey, appointments)
    }

    return appointments
  }
}

export default ListProviderAppointmentsService
