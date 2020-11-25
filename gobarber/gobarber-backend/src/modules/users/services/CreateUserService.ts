import { getRepository } from "typeorm";
import { hash } from 'bcryptjs'
import User from "@modules/users/infra/typeorm/entities/User";
import AppError from "@shared/errors/AppError";
import IUserRepository from "../repositories/IUserRepository";
import { injectable, inject } from 'tsyringe'

interface IRequest {
  name: string
  email: string
  password: string
}

@injectable()
class CreateUserService {

  constructor(@inject('UserRepository') private userRepository: IUserRepository) {
    this.userRepository = userRepository
  }

  public async execute({ name, email, password }: IRequest): Promise<User> {

    const checkDuplicateEmail = await this.userRepository.findByEmail(email)

    if (checkDuplicateEmail) {
      throw new AppError('Emails Alredy exists a user with a user')
    }

    const hashedPassword = await hash(password, 8)
    const user = await this.userRepository.create({ name, email, password: hashedPassword })

    return user
  }

}

export default CreateUserService
