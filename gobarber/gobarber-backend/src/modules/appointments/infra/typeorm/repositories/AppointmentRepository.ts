import { getRepository, Repository } from 'typeorm'
import Appointment from '@modules/appointments/infra/typeorm/entities/Appointment'
import IAppointmentRepository from '@modules/appointments/repositories/IAppointmentRepository'
import ICreateAppointmentDTO from '@modules/appointments/dtos/ICreateAppointmentDTO'
import AppointmentController from '../../http/controllers/AppointmentController'
import User from '@modules/users/infra/typeorm/entities/User'

class AppointmentRepository implements IAppointmentRepository {

  private ormRepository: Repository<Appointment>

  constructor() {
    this.ormRepository = getRepository(Appointment)
  }

  public async create({ provider, date }: ICreateAppointmentDTO): Promise<Appointment> {

    const appointment = this.ormRepository.create({ provider, date })

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
    return await this.ormRepository.find({ where: { provider: user } })
  }
}

export default AppointmentRepository
