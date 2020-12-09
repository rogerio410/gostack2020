import FakeHashProvider from '@modules/users/providers/HashProvider/fakes/FakeHashProvider'
import IHashProvider from '@modules/users/providers/HashProvider/models/IHashProvider'
import FakeUserRepository from '@modules/users/repositories/fakes/FakeUserRepository'
import IUserRepository from '@modules/users/repositories/IUserRepository'
import CreateUserService from '@modules/users/services/CreateUserService'
import ShowProfileService from '@modules/users/services/ShowProfileService'
import FakeCacheProvider from '@shared/container/providers/CacheProvider/fakes/FakeCacheProvider'
import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider'
import ListProviderService from './ListProvidersService'

let fakeUserRepository: IUserRepository
let createUserService: CreateUserService
let fakeHashProvider: IHashProvider
let listProviderService: ListProviderService
let fakeCacheProvider: ICacheProvider

describe('List Provider', () => {
  beforeEach(() => {
    fakeUserRepository = new FakeUserRepository()
    fakeHashProvider = new FakeHashProvider()
    fakeCacheProvider = new FakeCacheProvider()

    createUserService = new CreateUserService(
      fakeUserRepository,
      fakeHashProvider,
      fakeCacheProvider
    )
    listProviderService = new ListProviderService(
      fakeUserRepository,
      fakeCacheProvider
    )
  })

  it('should to list providers', async () => {
    const user1 = await createUserService.execute({
      name: 'Rogério Silva',
      email: 'rogerio410@gmail.com',
      password: '123456',
    })

    const user2 = await createUserService.execute({
      name: 'Maria Silva',
      email: 'maria410@gmail.com',
      password: '123456',
    })

    const loggedInUser = await createUserService.execute({
      name: 'Joao Silva',
      email: 'joao410@gmail.com',
      password: '123456',
    })

    const providers = await listProviderService.execute({
      user_id: loggedInUser.id,
    })

    expect(providers.length).toBe(2)
    expect(providers).toEqual([user1, user2])
  })
})
