import ICreateUserDTO from '@modules/users/dtos/ICreateUserDTO'
import IUserRepository from '@modules/users/repositories/IUserRepository'
import { getRepository, Repository } from 'typeorm'
import User from '../entities/User'

class UserRepository implements IUserRepository {
  private ormRepository: Repository<User>

  constructor() {
    this.ormRepository = getRepository(User)
  }

  public async create(userData: ICreateUserDTO): Promise<User> {
    const user = this.ormRepository.create(userData)

    await this.ormRepository.save(user)

    return user
  }

  public async save(user: User): Promise<User> {
    return this.ormRepository.save(user)
  }

  public async findById(id: string): Promise<User | undefined> {
    return this.ormRepository.findOne(id)
  }

  public async findByEmail(email: string): Promise<User | undefined> {
    return this.ormRepository.findOne({ where: { email } })
  }
}

export default UserRepository
