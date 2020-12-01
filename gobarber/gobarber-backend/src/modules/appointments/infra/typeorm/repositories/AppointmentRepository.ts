import { getRepository, Repository } from 'typeorm'
import Appointment from '@modules/appointments/infra/typeorm/entities/Appointment'
import IAppointmentRepository, {
  IFindAllAppointmentDTO,
} from '@modules/appointments/repositories/IAppointmentRepository'
import ICreateAppointmentDTO from '@modules/appointments/dtos/ICreateAppointmentDTO'
import User from '@modules/users/infra/typeorm/entities/User'

class AppointmentRepository implements IAppointmentRepository {
  private ormRepository: Repository<Appointment>

  constructor() {
    this.ormRepository = getRepository(Appointment)
  }

  public async create({
    provider_id,
    user_id,
    date,
  }: ICreateAppointmentDTO): Promise<Appointment> {
    const provider = new User()
    provider.id = provider_id
    const user = new User()
    user.id = user_id

    const appointment = this.ormRepository.create({
      provider,
      user,
      date,
    })

    await this.ormRepository.save(appointment)

    return appointment
  }

  public async findByDate(date: Date): Promise<Appointment | undefined> {
    const appointment = await this.ormRepository.findOne({
      where: { date },
    })

    return appointment
  }

  public async all(user: User): Promise<Appointment[]> {
    return this.ormRepository.find({ where: { provider: user } })
  }

  public async findAll({
    provider_id,
    month,
    year,
    day,
  }: IFindAllAppointmentDTO): Promise<Appointment[]> {
    let appointments = this.ormRepository.createQueryBuilder().select()

    if (provider_id)
      appointments = appointments.where(
        'Appointment.providerId = :provider_id',
        { provider_id }
      )

    if (month && year) {
      const formattedMonth = month.toString().padStart(2, '0')
      if (day) {
        const formattedDay = day.toString().padStart(2, '0')
        appointments = appointments.andWhere(
          `to_char(Appointment.date, 'DD-MM-YYYY') = '${formattedDay}-${formattedMonth}-${year}' `
        )
      } else {
        appointments = appointments.andWhere(
          `to_char(Appointment.date, 'MM-YYYY') = '${formattedMonth}-${year}' `
        )
      }
    }

    return appointments.getMany()
  }
}

export default AppointmentRepository
