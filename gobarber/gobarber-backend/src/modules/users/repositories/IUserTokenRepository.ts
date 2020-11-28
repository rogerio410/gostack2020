import User from '../infra/typeorm/entities/User'
import UserToken from '../infra/typeorm/entities/UserToken'

export default interface IUserTokenRepository {
  generate(user: User): Promise<UserToken>
  findByToken(token: string): Promise<UserToken | undefined>
}
