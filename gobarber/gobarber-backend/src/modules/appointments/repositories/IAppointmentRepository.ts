import User from '@modules/users/infra/typeorm/entities/User'
import ICreateAppointmentDTO from '../dtos/ICreateAppointmentDTO'
import Appointment from '../infra/typeorm/entities/Appointment'

export interface IFindAllAppointmentDTO {
  provider_id?: string
  month?: number
  year?: number
  day?: number
}

export default interface IAppointmentRepository {
  create(data: ICreateAppointmentDTO): Promise<Appointment>
  findByDate(date: Date): Promise<Appointment | undefined>
  all(user: User): Promise<Appointment[]>
  findAll(data: IFindAllAppointmentDTO): Promise<Appointment[]>
}
