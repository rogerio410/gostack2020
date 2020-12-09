import FakeCacheProvider from '@shared/container/providers/CacheProvider/fakes/FakeCacheProvider'
import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider'
import AppError from '@shared/errors/AppError'
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider'
import IHashProvider from '../providers/HashProvider/models/IHashProvider'
import FakeUserRepository from '../repositories/fakes/FakeUserRepository'
import IUserRepository from '../repositories/IUserRepository'
import AuthUserService from './AuthUserService'
import CreateUserService from './CreateUserService'

let fakeHashProvider: IHashProvider
let createUserService: CreateUserService
let authService: AuthUserService
let fakeUserRepository: IUserRepository
let fakeCacheProvider: ICacheProvider

describe('Auth User', () => {
  beforeEach(() => {
    fakeUserRepository = new FakeUserRepository()
    fakeHashProvider = new FakeHashProvider()
    fakeCacheProvider = new FakeCacheProvider()

    createUserService = new CreateUserService(
      fakeUserRepository,
      fakeHashProvider,
      fakeCacheProvider
    )
    authService = new AuthUserService(fakeUserRepository, fakeHashProvider)
  })

  it('should authenticate user', async () => {
    const user = await createUserService.execute({
      name: 'Rogério Silva',
      email: 'rogerio410@gmail.com',
      password: '123456',
    })

    const response = await authService.execute({
      email: 'rogerio410@gmail.com',
      password: '123456',
    })

    expect(response).toHaveProperty('token')
    expect(response.user).toEqual(user)
  })

  it('should not be able authenticate with non existing user', async () => {
    expect(
      authService.execute({
        email: 'rogerio410@gmail.com',
        password: '123456',
      })
    ).rejects.toBeInstanceOf(AppError)
  })

  it('should not be able authenticate with wrong password', async () => {
    await createUserService.execute({
      name: 'Rogério Silva',
      email: 'rogerio410@gmail.com',
      password: '123456',
    })

    await expect(
      authService.execute({
        email: 'rogerio410@gmail.com',
        password: '123456--',
      })
    ).rejects.toBeInstanceOf(AppError)
  })
})
