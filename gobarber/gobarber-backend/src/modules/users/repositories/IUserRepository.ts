import ICreateUserDTO from '../dtos/ICreateUserDTO'
import IFindAllUsersDTO from '../dtos/IFindAllUsersDTO'
import User from '../infra/typeorm/entities/User'

export default interface IUserRepository {
  create(data: ICreateUserDTO): Promise<User>
  save(user: User): Promise<User>
  findAll(data: IFindAllUsersDTO): Promise<User[]>
  findById(id: string): Promise<User | undefined>
  findByEmail(email: string): Promise<User | undefined>
}
