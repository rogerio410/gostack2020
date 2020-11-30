import AppError from '@shared/errors/AppError'
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider'
import IHashProvider from '../providers/HashProvider/models/IHashProvider'
import FakeUserRepository from '../repositories/fakes/FakeUserRepository'
import IUserRepository from '../repositories/IUserRepository'
import CreateUserService from './CreateUserService'
import UpdateUserProfileService from './UpdateUserProfileService'

let fakeHashProvider: IHashProvider
let updateUserProfileService: UpdateUserProfileService
let fakeUserRepository: IUserRepository
let createUserService: CreateUserService

describe('Create User', () => {
  beforeEach(() => {
    fakeUserRepository = new FakeUserRepository()
    fakeHashProvider = new FakeHashProvider()

    createUserService = new CreateUserService(
      fakeUserRepository,
      fakeHashProvider
    )

    updateUserProfileService = new UpdateUserProfileService(
      fakeUserRepository,
      fakeHashProvider
    )
  })

  it('should to update the profile', async () => {
    const user = await createUserService.execute({
      name: 'Rogério Silva',
      email: 'rogerio410@gmail.com',
      password: '123456',
    })

    const updatedUser = await updateUserProfileService.execute({
      user_id: user.id,
      name: 'Rogério Silva Souza',
      email: 'rogeriosouza410@gmail.com',
    })

    expect(updatedUser.name).toBe('Rogério Silva Souza')
    expect(updatedUser.email).toBe('rogeriosouza410@gmail.com')
  })

  it('should not be able to update email to a already used one', async () => {
    const user = await createUserService.execute({
      name: 'Rogério Silva',
      email: 'rogerio410@gmail.com',
      password: '123456',
    })
    const user2 = await createUserService.execute({
      name: 'Rogério Silva 2',
      email: 'rogerio4102@gmail.com',
      password: '123456',
    })

    await expect(
      updateUserProfileService.execute({
        user_id: user.id,
        name: 'Rogério Silva Souza',
        email: 'rogerio4102@gmail.com',
      })
    ).rejects.toBeInstanceOf(AppError)
  })

  it('should to update the password', async () => {
    const user = await createUserService.execute({
      name: 'Rogério Silva',
      email: 'rogerio410@gmail.com',
      password: '123456',
    })

    const updatedUser = await updateUserProfileService.execute({
      user_id: user.id,
      name: 'Rogério Silva Souza',
      email: 'rogeriosouza410@gmail.com',
      password: '111111',
      old_password: '123456',
    })

    expect(updatedUser.password).toBe('111111')
  })

  it('should not to update the password without old_password', async () => {
    const user = await createUserService.execute({
      name: 'Rogério Silva',
      email: 'rogerio410@gmail.com',
      password: '123456',
    })

    await expect(
      updateUserProfileService.execute({
        user_id: user.id,
        name: 'Rogério Silva Souza',
        email: 'rogeriosouza410@gmail.com',
        password: '123456',
      })
    ).rejects.toBeInstanceOf(AppError)
  })

  it('should not to update the password with wrong old_password', async () => {
    const user = await createUserService.execute({
      name: 'Rogério Silva',
      email: 'rogerio410@gmail.com',
      password: '123456',
    })

    await expect(
      updateUserProfileService.execute({
        user_id: user.id,
        name: 'Rogério Silva Souza',
        email: 'rogeriosouza410@gmail.com',
        password: '111111',
        old_password: '222222',
      })
    ).rejects.toBeInstanceOf(AppError)
  })

  it('should to update the profile from a non-existing user', async () => {
    await expect(
      updateUserProfileService.execute({
        user_id: 'no-existing user id',
        name: 'Rogério Silva Souza',
        email: 'rogeriosouza410@gmail.com',
        password: '123456',
      })
    ).rejects.toBeInstanceOf(AppError)
  })
})
