import FakeDiskStorageProvider from '@shared/container/providers/StorageProvider/fakes/FakeDiskStorageProvider'
import AppError from '@shared/errors/AppError'
import FakeUserRepository from '../repositories/fakes/FakeUserRepository'
import UpdateUserAvatarService from './UpdateUserAvatarService'

describe('Update Avar', () => {
  it('should update avatar of a existing user', async () => {
    const fakeUserRepository = new FakeUserRepository()
    const fakeStorageProvider = new FakeDiskStorageProvider()

    const updateUserAvatarService = new UpdateUserAvatarService(
      fakeUserRepository,
      fakeStorageProvider
    )

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
    const fakeUserRepository = new FakeUserRepository()
    const fakeStorageProvider = new FakeDiskStorageProvider()

    const updateUserAvatarService = new UpdateUserAvatarService(
      fakeUserRepository,
      fakeStorageProvider
    )

    expect(
      updateUserAvatarService.execute({
        user_id: 'okokokok',
        avatar_filename: 'avatar.jpg',
      })
    ).rejects.toBeInstanceOf(AppError)
  })

  it('should update avatar of a existing user with a existing avatar', async () => {
    const fakeUserRepository = new FakeUserRepository()
    const fakeStorageProvider = new FakeDiskStorageProvider()

    const deleteFile = jest.spyOn(fakeStorageProvider, 'deleteFile')

    const updateUserAvatarService = new UpdateUserAvatarService(
      fakeUserRepository,
      fakeStorageProvider
    )

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
