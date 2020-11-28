import { addHours, differenceInHours, isAfter } from 'date-fns'
import AppError from '@shared/errors/AppError'
import { injectable, inject } from 'tsyringe'
import IHashProvider from '../providers/HashProvider/models/IHashProvider'
import IUserRepository from '../repositories/IUserRepository'
import IUserTokenRepository from '../repositories/IUserTokenRepository'

interface IRequest {
  token: string
  password: string
}

@injectable()
class ResetPasswordService {
  constructor(
    @inject('UserRepository') private userRepository: IUserRepository,
    @inject('UserTokenRepository')
    private userTokenRepository: IUserTokenRepository,
    @inject('UserTokenRepository') private hashProvider: IHashProvider
  ) { }

  public async execute({ token, password }: IRequest): Promise<void> {
    const userToken = await this.userTokenRepository.findByToken(token)

    if (!userToken) {
      throw new AppError('User token does not exist')
    }
    const { user } = userToken

    if (!user) {
      throw new AppError('User does not exist')
    }

    const tokenCreatedAtPlus2 = addHours(userToken.created_at, 2)

    if (isAfter(Date.now(), tokenCreatedAtPlus2)) {
      throw new AppError('Token expired')
    }

    user.password = await this.hashProvider.generateHash(password)

    await this.userRepository.save(user)
  }
}

export default ResetPasswordService
