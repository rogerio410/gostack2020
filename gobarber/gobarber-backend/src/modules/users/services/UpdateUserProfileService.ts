import { injectable, inject } from 'tsyringe'
import AppError from '@shared/errors/AppError'
import IUserRepository from '../repositories/IUserRepository'
import IHashProvider from '../providers/HashProvider/models/IHashProvider'
import User from '../infra/typeorm/entities/User'

interface IRequest {
  user_id: string
  name: string
  email: string
  password?: string
  old_password?: string
}

@injectable()
class UpdateUserProfileService {
  constructor(
    @inject('UserRepository') private userRepository: IUserRepository,
    @inject('HashProvider') private hashProvider: IHashProvider
  ) {
    this.userRepository = userRepository
  }

  public async execute({
    user_id,
    name,
    email,
    password,
    old_password,
  }: IRequest): Promise<User> {
    const user = await this.userRepository.findById(user_id)

    if (!user) {
      throw new AppError('User not found!')
    }

    const userByEmail = await this.userRepository.findByEmail(email)

    if (userByEmail && userByEmail.id !== user.id) {
      throw new AppError('Email is already in use!')
    }

    user.name = name
    user.email = email

    if (password && !old_password) {
      throw new AppError('You must inform actual password')
    }

    if (password && old_password) {
      const validOldPassword = await this.hashProvider.compareHash(
        old_password,
        user.password
      )
      if (!validOldPassword) {
        throw new AppError('Old password does not match')
      }
    }

    if (password) {
      user.password = await this.hashProvider.generateHash(password)
    }

    return this.userRepository.save(user)
  }
}

export default UpdateUserProfileService
