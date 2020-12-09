import FakeCacheProvider from '@shared/container/providers/CacheProvider/fakes/FakeCacheProvider'
import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider'
import AppError from '@shared/errors/AppError'
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider'
import IHashProvider from '../providers/HashProvider/models/IHashProvider'
import FakeUserRepository from '../repositories/fakes/FakeUserRepository'
import IUserRepository from '../repositories/IUserRepository'
import CreateUserService from './CreateUserService'
import ShowProfileService from './ShowProfileService'

let fakeUserRepository: IUserRepository
let createUserService: CreateUserService
let fakeHashProvider: IHashProvider
let showProfileService: ShowProfileService
let fakeCacheProvider: ICacheProvider

describe('Create User', () => {
  beforeEach(() => {
    fakeUserRepository = new FakeUserRepository()
    fakeHashProvider = new FakeHashProvider()
    showProfileService = new ShowProfileService(fakeUserRepository)
    fakeCacheProvider = new FakeCacheProvider()

    createUserService = new CreateUserService(
      fakeUserRepository,
      fakeHashProvider,
      fakeCacheProvider
    )
  })

  it('should to show the profile', async () => {
    const user = await createUserService.execute({
      name: 'Rogério Silva',
      email: 'rogerio410@gmail.com',
      password: '123456',
    })

    const profile = await showProfileService.execute({
      user_id: user.id,
    })

    expect(profile.name).toBe('Rogério Silva')
    expect(profile.email).toBe('rogerio410@gmail.com')
  })

  it('should to show the profile from a non-existing user', async () => {
    await expect(
      showProfileService.execute({
        user_id: `oioioi`,
      })
    ).rejects.toBeInstanceOf(AppError)
  })
})
