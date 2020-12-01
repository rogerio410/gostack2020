import User from '@modules/users/infra/typeorm/entities/User'

export default interface ICreateAppointmentDTO {
  provider_id: string
  user_id: string
  date: Date
}
