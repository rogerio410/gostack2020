import AppError from '@shared/errors/AppError'
import { v4 as uuid } from 'uuid'
import User from '../infra/typeorm/entities/User'
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider'
import FakeUserRepository from '../repositories/fakes/FakeUserRepository'
import CreateUserService from './CreateUserService'

describe('Create User', () => {
  it('should create a new user', async () => {
    const fakeUserRepository = new FakeUserRepository()
    const fakeHashProvider = new FakeHashProvider()

    const createUserService = new CreateUserService(
      fakeUserRepository,
      fakeHashProvider
    )

    const user = await createUserService.execute({
      name: 'Rogério Silva',
      email: 'rogerio410@gmail.com',
      password: '123456',
    })

    expect(user).toHaveProperty('id')
  })

  it('should not create a new user with duplicate email', async () => {
    const fakeUserRepository = new FakeUserRepository()
    const fakeHashProvider = new FakeHashProvider()

    const createUserService = new CreateUserService(
      fakeUserRepository,
      fakeHashProvider
    )

    const provider = new User()
    provider.id = uuid()

    await createUserService.execute({
      name: 'Rogério Silva',
      email: 'rogerio410@gmail.com',
      password: '123456',
    })

    expect(
      createUserService.execute({
        name: 'Rogério Silva',
        email: 'rogerio410@gmail.com',
        password: '123456',
      })
    ).rejects.toBeInstanceOf(AppError)
  })
})
