import AppError from '@shared/errors/AppError'
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider'
import IHashProvider from '../providers/HashProvider/models/IHashProvider'
import FakeUserRepository from '../repositories/fakes/FakeUserRepository'
import FakeUserTokenRepository from '../repositories/fakes/FakeUserTokenRepository'
import ResetPasswordService from './ResetPasswordService'

let fakeUserRepository: FakeUserRepository
let fakeUserTokenRepository: FakeUserTokenRepository
let resetPasswordService: ResetPasswordService
let fakeHashProvider: IHashProvider

describe('Reset Password', () => {
  beforeEach(() => {
    fakeUserRepository = new FakeUserRepository()
    fakeUserTokenRepository = new FakeUserTokenRepository()
    fakeHashProvider = new FakeHashProvider()

    resetPasswordService = new ResetPasswordService(
      fakeUserRepository,
      fakeUserTokenRepository,
      fakeHashProvider
    )
  })

  it('should be able to reset the password using token', async () => {
    const user = await fakeUserRepository.create({
      name: 'Rogério Silva',
      email: 'rogerio410@gmail.com',
      password: '123456',
    })

    const { token } = await fakeUserTokenRepository.generate(user)

    const generateHash = jest.spyOn(fakeHashProvider, 'generateHash')

    await resetPasswordService.execute({
      token,
      password: '654321',
    })

    const updatedUser = await fakeUserRepository.findById(user.id)

    expect(generateHash).toBeCalledWith('654321')
    expect(updatedUser?.password).toBe('654321')
  })

  it('should not be able to reset password with a non existing token', async () => {
    await expect(
      resetPasswordService.execute({
        token: 'non existing token',
        password: '654321',
      })
    ).rejects.toBeInstanceOf(AppError)
  })

  it('should not be able to reset password with a expired token', async () => {
    const user = await fakeUserRepository.create({
      name: 'Rogério Silva',
      email: 'rogerio410@gmail.com',
      password: '123456',
    })

    const { token } = await fakeUserTokenRepository.generate(user)

    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      const customDate = new Date()
      return customDate.setHours(customDate.getHours() + 3)
    })

    await expect(
      resetPasswordService.execute({
        token,
        password: '654321',
      })
    ).rejects.toBeInstanceOf(AppError)
  })
})
