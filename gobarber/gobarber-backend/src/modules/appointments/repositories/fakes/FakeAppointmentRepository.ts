import { isEqual, getMonth, getYear, getDate } from 'date-fns'
import Appointment from '@modules/appointments/infra/typeorm/entities/Appointment'
import IAppointmentRepository, {
  IFindAllAppointmentDTO,
} from '@modules/appointments/repositories/IAppointmentRepository'
import ICreateAppointmentDTO from '@modules/appointments/dtos/ICreateAppointmentDTO'
import { v4 as uuid } from 'uuid'
import User from '@modules/users/infra/typeorm/entities/User'
import ProvidersController from '@modules/appointments/infra/http/controllers/ProvidersController'

class FakeAppointmentRepository implements IAppointmentRepository {
  private appointments: Appointment[] = []

  public async create({
    provider_id,
    user_id,
    date,
  }: ICreateAppointmentDTO): Promise<Appointment> {
    const appointment = new Appointment()
    const provider = new User()
    provider.id = provider_id

    const user = new User()
    user.id = user_id

    Object.assign(appointment, { id: uuid(), provider, user, date })

    this.appointments.push(appointment)

    return appointment
  }

  public async findByDateAndProvider(
    date: Date,
    provider: User
  ): Promise<Appointment | undefined> {
    const findAppointment = this.appointments.find(
      appointment =>
        isEqual(appointment.date, date) &&
        appointment.provider.id === provider.id
    )

    return findAppointment
  }

  public async findAll({
    provider_id,
    month,
    year,
    day,
  }: IFindAllAppointmentDTO): Promise<Appointment[]> {
    const appointments: Appointment[] = this.appointments.filter(
      appointment => {
        if (day) {
          return (
            appointment.provider.id === provider_id &&
            getMonth(appointment.date) + 1 === month &&
            getYear(appointment.date) === year &&
            getDate(appointment.date) === day
          )
        }

        return (
          appointment.provider.id === provider_id &&
          getMonth(appointment.date) + 1 === month &&
          getYear(appointment.date) === year
        )
      }
    )

    return appointments
  }

  public async all(user: User): Promise<Appointment[]> {
    return this.appointments
  }
}

export default FakeAppointmentRepository
