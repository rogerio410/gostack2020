import { injectable, inject } from 'tsyringe'
import IUserRepository from '@modules/users/repositories/IUserRepository'
import User from '@modules/users/infra/typeorm/entities/User'
import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider'
import { classToClass } from 'class-transformer'

interface IRequest {
  user_id: string
}

@injectable()
class ListProviderService {
  constructor(
    @inject('UserRepository') private userRepository: IUserRepository,
    @inject('CacheProvider')
    private cacheProvider: ICacheProvider
  ) { }

  public async execute({ user_id }: IRequest): Promise<User[]> {
    let users = await this.cacheProvider.recovery<User[]>(
      `providers-list:${user_id}`
    )

    // let users

    if (!users) {
      users = await this.userRepository.findAll({ except_user_id: user_id })

      await this.cacheProvider.save(
        `providers-list:${user_id}`,
        classToClass(users)
      )
    }
    return users
  }
}

export default ListProviderService
