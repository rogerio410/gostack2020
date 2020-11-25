import User from "../infra/typeorm/entities/User"
import { compare } from 'bcryptjs'
import { sign } from 'jsonwebtoken'
import authConfig from '@config/auth'
import AppError from "@shared/errors/AppError"
import IUserRepository from "../repositories/IUserRepository"
import { injectable, inject } from 'tsyringe'

interface IRequest {
  email: string,
  password: string
}

@injectable()
class AuthUserService {

  constructor(@inject('UserRepository') private userRepository: IUserRepository) {
    this.userRepository = userRepository
  }

  public async execute({ email, password }: IRequest): Promise<{ user: User, token: string }> {
    const user = await this.userRepository.findByEmail(email)

    if (!user) {
      throw new AppError('Incorrect email/password!')
    }

    const passwordMatched = await compare(password, user.password)

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
