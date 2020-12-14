import path from 'path'
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
    @inject('MailProvider') private mailProvider: IMailProvider,
    @inject('UserTokenRepository')
    private userTokenRepository: IUserTokenRepository
  ) { }

  public async execute({ email }: IRequest): Promise<void> {
    const findUser = await this.userRepository.findByEmail(email)

    if (!findUser) {
      throw new AppError('User not found!')
    }

    const { token } = await this.userTokenRepository.generate(findUser)

    const forgotTemplateFile = path.resolve(
      __dirname,
      '..',
      'views',
      'forgot_password.hbs'
    )
    await this.mailProvider.sendMail({
      to: {
        name: findUser.name,
        email: findUser.email,
      },
      subject: '[GoBarber] Recuperação de Senha',
      templateData: {
        file: forgotTemplateFile,
        variables: {
          name: findUser.name,
          link: `${process.env.APP_WEB_URL}/reset-password?token=${token}`,
        },
      },
    })
  }
}

export default SendForgotPasswordEmailService
