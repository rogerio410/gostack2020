import { sign } from 'jsonwebtoken'
import authConfig from '@config/auth'
import AppError from '@shared/errors/AppError'
import { injectable, inject } from 'tsyringe'
import IUserRepository from '../repositories/IUserRepository'
import User from '../infra/typeorm/entities/User'
import IHashProvider from '../providers/HashProvider/models/IHashProvider'

interface IRequest {
  email: string
  password: string
}

@injectable()
class AuthUserService {
  constructor(
    @inject('UserRepository') private userRepository: IUserRepository,
    @inject('HashProvider') private hashProvider: IHashProvider
  ) {
    this.userRepository = userRepository
  }

  public async execute({
    email,
    password,
  }: IRequest): Promise<{ user: User; token: string }> {
    const user = await this.userRepository.findByEmail(email)

    if (!user) {
      throw new AppError('Incorrect email/password!')
    }

    const passwordMatched = await this.hashProvider.compareHash(
      password,
      user.password
    )

    if (!passwordMatched) {
      throw new AppError('Incorrect email/password!', 401)
    }

    const { secret, expiresIn } = authConfig.jwt

    const token = sign({}, secret, {
      subject: user.id,
      expiresIn,
    })
    return { user, token }
  }
}

export default AuthUserService
