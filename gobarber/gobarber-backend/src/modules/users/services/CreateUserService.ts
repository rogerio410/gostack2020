import User from '@modules/users/infra/typeorm/entities/User'
import AppError from '@shared/errors/AppError'
import { injectable, inject } from 'tsyringe'
import IHashProvider from '@modules/users/providers/HashProvider/models/IHashProvider'
import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider'
import IUserRepository from '../repositories/IUserRepository'

interface IRequest {
  name: string
  email: string
  password: string
}

@injectable()
class CreateUserService {
  constructor(
    @inject('UserRepository') private userRepository: IUserRepository,
    @inject('HashProvider') private hashProvider: IHashProvider,
    @inject('CacheProvider')
    private cacheProvider: ICacheProvider
  ) { }

  public async execute({ name, email, password }: IRequest): Promise<User> {
    const checkDuplicateEmail = await this.userRepository.findByEmail(email)

    if (checkDuplicateEmail) {
      throw new AppError('Emails Alredy exists a user with a user')
    }

    const hashedPassword = await this.hashProvider.generateHash(password)
    const user = await this.userRepository.create({
      name,
      email,
      password: hashedPassword,
    })

    await this.cacheProvider.invalidadePrefix('providers-list')

    return user
  }
}

export default CreateUserService
