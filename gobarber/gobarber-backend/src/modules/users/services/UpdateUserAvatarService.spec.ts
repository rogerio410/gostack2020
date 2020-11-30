import FakeDiskStorageProvider from '@shared/container/providers/StorageProvider/fakes/FakeDiskStorageProvider'
import IStorageProvider from '@shared/container/providers/StorageProvider/models/IStorageProvider'
import AppError from '@shared/errors/AppError'
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider'
import IHashProvider from '../providers/HashProvider/models/IHashProvider'
import FakeUserRepository from '../repositories/fakes/FakeUserRepository'
import IUserRepository from '../repositories/IUserRepository'
import CreateUserService from './CreateUserService'
import UpdateUserAvatarService from './UpdateUserAvatarService'

let fakeHashProvider: IHashProvider
let fakeUserRepository: IUserRepository
let updateUserAvatarService: UpdateUserAvatarService
let fakeStorageProvider: IStorageProvider

describe('Update Avar', () => {
  beforeEach(() => {
    fakeUserRepository = new FakeUserRepository()
    fakeHashProvider = new FakeHashProvider()
    fakeStorageProvider = new FakeDiskStorageProvider()

    updateUserAvatarService = new UpdateUserAvatarService(
      fakeUserRepository,
      fakeStorageProvider
    )
  })

  it('should update avatar of a existing user', async () => {
    const user = await fakeUserRepository.create({
      name: 'John Doe',
      email: 'johndow@gmail.com',
      password: '1234',
    })

    const updatedUser = await updateUserAvatarService.execute({
      user_id: user.id,
      avatar_filename: 'avatar.jpg',
    })

    expect(updatedUser.avatar).toBe('avatar.jpg')
  })

  it('should not be able to update avatar of a existing user', async () => {
    expect(
      updateUserAvatarService.execute({
        user_id: 'okokokok',
        avatar_filename: 'avatar.jpg',
      })
    ).rejects.toBeInstanceOf(AppError)
  })

  it('should update avatar of a existing user with a existing avatar', async () => {
    const deleteFile = jest.spyOn(fakeStorageProvider, 'deleteFile')

    const user = await fakeUserRepository.create({
      name: 'John Doe',
      email: 'johndow@gmail.com',
      password: '1234',
    })

    await updateUserAvatarService.execute({
      user_id: user.id,
      avatar_filename: 'avatar.jpg',
    })

    await updateUserAvatarService.execute({
      user_id: user.id,
      avatar_filename: 'avatar2.jpg',
    })

    expect(deleteFile).toHaveBeenCalledWith('avatar.jpg')
    expect(user.avatar).toBe('avatar2.jpg')
  })
})
