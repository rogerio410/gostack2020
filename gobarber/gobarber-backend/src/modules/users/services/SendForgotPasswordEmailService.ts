import IMailProvider from '@shared/container/providers/MailProvider/models/IMailProvider'
import AppError from '@shared/errors/AppError'
import { injectable, inject } from 'tsyringe'
import IUserRepository from '../repositories/IUserRepository'
import IUserTokenRepository from '../repositories/IUserTokenRepository'

interface IRequest {
  email: string
}

@injectable()
class SendForgotPasswordEmailService {
  constructor(
    @inject('UserRepository') private userRepository: IUserRepository,
    @inject('MailRepository') private mailProvider: IMailProvider,
    @inject('UserTokenRepository')
    private userTokenRepository: IUserTokenRepository
  ) { }

  public async execute({ email }: IRequest): Promise<void> {
    const findUser = await this.userRepository.findByEmail(email)

    if (!findUser) {
      throw new AppError('User not found!')
    }

    await this.userTokenRepository.generate(findUser)

    this.mailProvider.sendMail(email, 'recovery password email')
  }
}

export default SendForgotPasswordEmailService
