import ICreateUserDTO from '@modules/users/dtos/ICreateUserDTO'
import IUserTokenRepository from '@modules/users/repositories/IUserTokenRepository'
import { getRepository, Repository } from 'typeorm'
import User from '../entities/User'
import UserToken from '../entities/UserToken'

class UserTokenRepository implements IUserTokenRepository {
  private ormRepository: Repository<UserToken>

  constructor() {
    this.ormRepository = getRepository(UserToken)
  }

  public async generate(user: User): Promise<UserToken> {
    const userToken = this.ormRepository.create({
      user,
    })

    await this.ormRepository.save(userToken)

    return userToken
  }

  public async findByToken(token: string): Promise<UserToken | undefined> {
    return this.ormRepository.findOne({ where: { token } })
  }
}

export default UserTokenRepository
