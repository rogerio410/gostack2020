import AppError from '@shared/errors/AppError'
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider'
import FakeUserRepository from '../repositories/fakes/FakeUserRepository'
import AuthUserService from './AuthUserService'
import CreateUserService from './CreateUserService'

describe('Auth User', () => {
  it('should authenticate user', async () => {
    const fakeUserRepository = new FakeUserRepository()
    const fakeHashProvider = new FakeHashProvider()

    const createUserService = new CreateUserService(
      fakeUserRepository,
      fakeHashProvider
    )
    const authService = new AuthUserService(
      fakeUserRepository,
      fakeHashProvider
    )

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
    const fakeUserRepository = new FakeUserRepository()
    const fakeHashProvider = new FakeHashProvider()

    const authService = new AuthUserService(
      fakeUserRepository,
      fakeHashProvider
    )

    expect(
      authService.execute({
        email: 'rogerio410@gmail.com',
        password: '123456',
      })
    ).rejects.toBeInstanceOf(AppError)
  })

  it('should not be able authenticate with wrong password', async () => {
    const fakeUserRepository = new FakeUserRepository()
    const fakeHashProvider = new FakeHashProvider()

    const createUserService = new CreateUserService(
      fakeUserRepository,
      fakeHashProvider
    )
    const authService = new AuthUserService(
      fakeUserRepository,
      fakeHashProvider
    )

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
