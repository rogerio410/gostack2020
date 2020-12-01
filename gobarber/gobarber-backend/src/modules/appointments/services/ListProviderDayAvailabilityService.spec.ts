import User from '@modules/users/infra/typeorm/entities/User'
import FakeAppointmentRepository from '../repositories/fakes/FakeAppointmentRepository'
import ListProviderDayAvailabilityService from './ListProviderDayAvailabilityService'

let listDayAvailabilityService: ListProviderDayAvailabilityService
let fakeAppointmentRepository: FakeAppointmentRepository

describe('List Day Availability', () => {
  beforeEach(() => {
    fakeAppointmentRepository = new FakeAppointmentRepository()
    listDayAvailabilityService = new ListProviderDayAvailabilityService(
      fakeAppointmentRepository
    )
  })

  it('should to list day availabilty to a provider for a date', async () => {
    const user = new User()
    user.id = '123123'
    const provider = new User()
    provider.id = '123123'

    await fakeAppointmentRepository.create({
      provider_id: provider.id,
      user_id: user.id,
      date: new Date(2020, 11, 2, 16),
    })
    await fakeAppointmentRepository.create({
      provider_id: provider.id,
      user_id: user.id,
      date: new Date(2020, 11, 2, 17),
    })

    jest.spyOn(Date, 'now').mockImplementation(() => {
      return new Date(2020, 11, 2, 11).getTime()
    })

    const availabilty = await listDayAvailabilityService.execute({
      provider_id: '123123',
      year: 2020,
      month: 12,
      day: 2,
    })

    expect(availabilty).toEqual(
      expect.arrayContaining([
        { hour: 10, available: false },
        { hour: 11, available: false },
        { hour: 15, available: true },
        { hour: 16, available: false },
        { hour: 16, available: false },
      ])
    )
  })
})
