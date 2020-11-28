import User from '@modules/users/infra/typeorm/entities/User'
import UserToken from '@modules/users/infra/typeorm/entities/UserToken'
import { v4 as uuid } from 'uuid'
import IUserTokenRepository from '../IUserTokenRepository'

class FakeUserTokenRepository implements IUserTokenRepository {
  private userTokens: UserToken[] = []

  public async generate(user: User): Promise<UserToken> {
    const userToken = new UserToken()

    Object.assign(userToken, {
      id: uuid(),
      token: uuid(),
      user,
      created_at: new Date(),
      updated_at: new Date(),
    })

    this.userTokens.push(userToken)

    return userToken
  }

  public async findByToken(token: string): Promise<UserToken | undefined> {
    const userToken = this.userTokens.find(
      findToken => findToken.token === token
    )
    return userToken
  }
}

export default FakeUserTokenRepository
