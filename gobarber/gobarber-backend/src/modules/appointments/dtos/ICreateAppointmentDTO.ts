import User from "@modules/users/infra/typeorm/entities/User";

export default interface ICreateAppointmentDTO {
  provider: User
  date: Date
}
