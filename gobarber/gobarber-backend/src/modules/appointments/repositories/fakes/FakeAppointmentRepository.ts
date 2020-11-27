import Appointment from '@modules/appointments/infra/typeorm/entities/Appointment'
import IAppointmentRepository from '@modules/appointments/repositories/IAppointmentRepository'
import ICreateAppointmentDTO from '@modules/appointments/dtos/ICreateAppointmentDTO'
import { v4 as uuid } from 'uuid'
import { isEqual } from 'date-fns'
import User from '@modules/users/infra/typeorm/entities/User'

class FakeAppointmentRepository implements IAppointmentRepository {
  private appointments: Appointment[] = []

  public async create({
    provider,
    date,
  }: ICreateAppointmentDTO): Promise<Appointment> {
    const appointment = new Appointment()
    // appointment.id = uuid()
    // appointment.provider = provider
    // appointment.date = date
    Object.assign(appointment, { id: uuid(), provider, date })

    this.appointments.push(appointment)

    return appointment
  }

  public async findByDate(date: Date): Promise<Appointment | undefined> {
    const findAppointment = this.appointments.find(appointment =>
      isEqual(appointment.date, date)
    )

    return findAppointment
  }

  public async all(user: User): Promise<Appointment[]> {
    return this.appointments
  }
}

export default FakeAppointmentRepository
