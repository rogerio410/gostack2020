import User from '@modules/users/infra/typeorm/entities/User'
import AppError from '@shared/errors/AppError'
import { uuid } from 'uuidv4'
import FakeAppointmentRepository from '../repositories/fakes/FakeAppointmentRepository'
import CreateAppointmentService from './CreateAppointmentService'

describe('Create Appointment', () => {
  it('should create a new appointment', async () => {
    const fakeAppointmentRepository = new FakeAppointmentRepository()

    const createAppointmentService = new CreateAppointmentService(
      fakeAppointmentRepository
    )

    const provider = new User()
    provider.id = uuid()

    const appointment = await createAppointmentService.execute({
      provider,
      date: new Date(),
    })

    expect(appointment).toHaveProperty('id')
    expect(appointment.provider.id).toBe(provider.id)
  })

  it('should not create 2 appointment for the same time', async () => {
    const fakeAppointmentRepository = new FakeAppointmentRepository()

    const createAppointmentService = new CreateAppointmentService(
      fakeAppointmentRepository
    )

    const provider = new User()
    provider.id = uuid()
    const appointmentDate = new Date(2020, 26, 10, 11)

    const appointment1 = await createAppointmentService.execute({
      provider,
      date: appointmentDate,
    })

    expect(
      createAppointmentService.execute({
        provider,
        date: appointmentDate,
      })
    ).rejects.toBeInstanceOf(AppError)
  })
})
