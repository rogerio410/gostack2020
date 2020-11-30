import AppError from '@shared/errors/AppError'
import { v4 as uuid } from 'uuid'
import User from '../infra/typeorm/entities/User'
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider'
import IHashProvider from '../providers/HashProvider/models/IHashProvider'
import FakeUserRepository from '../repositories/fakes/FakeUserRepository'
import IUserRepository from '../repositories/IUserRepository'
import CreateUserService from './CreateUserService'

let fakeHashProvider: IHashProvider
let createUserService: CreateUserService
let fakeUserRepository: IUserRepository

describe('Create User', () => {
  beforeEach(() => {
    fakeUserRepository = new FakeUserRepository()
    fakeHashProvider = new FakeHashProvider()

    createUserService = new CreateUserService(
      fakeUserRepository,
      fakeHashProvider
    )
  })

  it('should create a new user', async () => {
    const user = await createUserService.execute({
      name: 'Rogério Silva',
      email: 'rogerio410@gmail.com',
      password: '123456',
    })

    expect(user).toHaveProperty('id')
  })

  it('should not create a new user with duplicate email', async () => {
    const provider = new User()
    provider.id = uuid()

    await createUserService.execute({
      name: 'Rogério Silva',
      email: 'rogerio410@gmail.com',
      password: '123456',
    })

    await expect(
      createUserService.execute({
        name: 'Rogério Silva',
        email: 'rogerio410@gmail.com',
        password: '123456',
      })
    ).rejects.toBeInstanceOf(AppError)
  })
})
