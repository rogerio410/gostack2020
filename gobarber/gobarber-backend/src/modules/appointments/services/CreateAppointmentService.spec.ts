import FakeNotificationsRepository from '@modules/notifications/repositories/fakes/FakeNotificationsRepository'
import User from '@modules/users/infra/typeorm/entities/User'
import FakeCacheProvider from '@shared/container/providers/CacheProvider/fakes/FakeCacheProvider'
import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider'
import AppError from '@shared/errors/AppError'
import { uuid } from 'uuidv4'
import FakeAppointmentRepository from '../repositories/fakes/FakeAppointmentRepository'
import CreateAppointmentService from './CreateAppointmentService'

describe('Create Appointment', () => {
  let fakeAppointmentRepository: FakeAppointmentRepository
  let fakeNotificationsRepository: FakeNotificationsRepository
  let createAppointmentService: CreateAppointmentService
  let fakeCacheProvider: ICacheProvider

  beforeEach(() => {
    fakeAppointmentRepository = new FakeAppointmentRepository()
    fakeNotificationsRepository = new FakeNotificationsRepository()
    fakeCacheProvider = new FakeCacheProvider()

    createAppointmentService = new CreateAppointmentService(
      fakeAppointmentRepository,
      fakeNotificationsRepository,
      fakeCacheProvider
    )
  })

  it('should create a new appointment', async () => {
    const provider = new User()
    provider.id = uuid()

    const user = new User()
    user.id = uuid()

    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2020, 9, 20, 12).getTime()
    })

    const appointment = await createAppointmentService.execute({
      provider_id: provider.id,
      user_id: user.id,
      date: new Date(2020, 9, 20, 13),
    })

    expect(appointment).toHaveProperty('id')
    expect(appointment.provider.id).toBe(provider.id)
    expect(appointment.user.id).toBe(user.id)
  })

  it('should not create 2 appointment for the same time', async () => {
    const provider = new User()
    provider.id = uuid()
    const user = new User()
    user.id = uuid()
    const appointmentDate = new Date(2020, 26, 10, 11)

    await createAppointmentService.execute({
      provider_id: provider.id,
      user_id: user.id,
      date: appointmentDate,
    })

    await expect(
      createAppointmentService.execute({
        provider_id: provider.id,
        user_id: user.id,
        date: appointmentDate,
      })
    ).rejects.toBeInstanceOf(AppError)
  })

  it('should not create apppointment in past date', async () => {
    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2020, 9, 20, 2).getTime()
    })

    await expect(
      createAppointmentService.execute({
        provider_id: '12',
        user_id: '2',
        date: new Date(2020, 9, 19, 8),
      })
    ).rejects.toBeInstanceOf(AppError)
  })

  it('should not create apppointment for user as provider', async () => {
    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2020, 9, 20, 2).getTime()
    })

    await expect(
      createAppointmentService.execute({
        provider_id: '12',
        user_id: '12',
        date: new Date(2020, 9, 19, 8),
      })
    ).rejects.toBeInstanceOf(AppError)
  })

  it('should not create apppointment before 8am and after 5pm', async () => {
    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2020, 9, 19, 2).getTime()
    })

    await expect(
      createAppointmentService.execute({
        provider_id: '12',
        user_id: '122',
        date: new Date(2020, 9, 20, 7),
      })
    ).rejects.toBeInstanceOf(AppError)

    await expect(
      createAppointmentService.execute({
        provider_id: '12',
        user_id: '122',
        date: new Date(2020, 9, 20, 18),
      })
    ).rejects.toBeInstanceOf(AppError)
  })
})
