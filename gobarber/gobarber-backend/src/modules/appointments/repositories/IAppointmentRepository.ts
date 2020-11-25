import User from "@modules/users/infra/typeorm/entities/User";
import ICreateAppointmentDTO from "../dtos/ICreateAppointmentDTO";
import Appointment from "../infra/typeorm/entities/Appointment";

export default interface IAppointmentRepository {
  create(data: ICreateAppointmentDTO): Promise<Appointment>
  findByDate(date: Date): Promise<Appointment | undefined>
  all(user: User): Promise<Appointment[]>
}
