import FakeMailProvider from '@shared/container/providers/MailProvider/fakes/FakeMailProvider'
import AppError from '@shared/errors/AppError'
import FakeUserRepository from '../repositories/fakes/FakeUserRepository'
import FakeUserTokenRepository from '../repositories/fakes/FakeUserTokenRepository'
import SendForgotPasswordEmailService from './SendForgotPasswordEmailService'

let fakeUserRepository: FakeUserRepository
let fakeMailProvider: FakeMailProvider
let fakeUserTokenRepository: FakeUserTokenRepository
let sendForgotService: SendForgotPasswordEmailService

describe('Send Forgot Password Email', () => {
  beforeEach(() => {
    fakeUserRepository = new FakeUserRepository()
    fakeMailProvider = new FakeMailProvider()
    fakeUserTokenRepository = new FakeUserTokenRepository()
    sendForgotService = new SendForgotPasswordEmailService(
      fakeUserRepository,
      fakeMailProvider,
      fakeUserTokenRepository
    )
  })

  it('should be able to recovery the password using email', async () => {
    const sendMail = jest.spyOn(fakeMailProvider, 'sendMail')

    await fakeUserRepository.create({
      name: 'Rogério Silva',
      email: 'rogerio410@gmail.com',
      password: '123456',
    })

    await sendForgotService.execute({
      email: 'rogerio410@gmail.com',
    })

    expect(sendMail).toBeCalled()
  })

  it('should not be able to recovery password on non existing user', async () => {
    await expect(
      sendForgotService.execute({
        email: 'rogerio410@gmail.com',
      })
    ).rejects.toBeInstanceOf(AppError)
  })

  it('should generate a forgotten password token', async () => {
    const generateToken = jest.spyOn(fakeUserTokenRepository, 'generate')

    const user = await fakeUserRepository.create({
      name: 'Rogério Silva',
      email: 'rogerio410@gmail.com',
      password: '123456',
    })

    await sendForgotService.execute({
      email: 'rogerio410@gmail.com',
    })

    expect(generateToken).toBeCalledWith(user)
  })
})
