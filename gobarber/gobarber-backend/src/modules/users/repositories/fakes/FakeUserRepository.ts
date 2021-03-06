import ICreateUserDTO from '@modules/users/dtos/ICreateUserDTO'
import IFindAllUsersDTO from '@modules/users/dtos/IFindAllUsersDTO'
import User from '@modules/users/infra/typeorm/entities/User'
import IUserRepository from '@modules/users/repositories/IUserRepository'
import { v4 as uuid } from 'uuid'

class FakeUserRepository implements IUserRepository {
  private users: User[] = []

  public async create(userData: ICreateUserDTO): Promise<User> {
    const user = new User()
    Object.assign(user, { id: uuid() }, userData)
    this.users.push(user)

    return user
  }

  public async findAll({ except_user_id }: IFindAllUsersDTO): Promise<User[]> {
    let { users } = this

    if (except_user_id) {
      users = users.filter(user => user.id !== except_user_id)
    }

    return users
  }

  public async save(user: User): Promise<User> {
    const findIndex = this.users.findIndex(
      actualUser => actualUser.id === user.id
    )

    if (findIndex) {
      this.users[findIndex] = user
    }

    return user
  }

  public async findById(id: string): Promise<User | undefined> {
    const findUser = this.users.find(user => user.id === id)
    return findUser
  }

  public async findByEmail(email: string): Promise<User | undefined> {
    const findUser = this.users.find(user => user.email === email)
    return findUser
  }
}

export default FakeUserRepository
