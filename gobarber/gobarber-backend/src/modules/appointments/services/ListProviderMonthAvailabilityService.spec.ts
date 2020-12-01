import User from '@modules/users/infra/typeorm/entities/User'
import FakeAppointmentRepository from '../repositories/fakes/FakeAppointmentRepository'
import ListProviderMonthAvailabilityService from './ListProviderMonthAvailabilityService'

let listAvailabilityService: ListProviderMonthAvailabilityService
let fakeAppointmentRepository: FakeAppointmentRepository

describe('List Availability', () => {
  beforeEach(() => {
    fakeAppointmentRepository = new FakeAppointmentRepository()
    listAvailabilityService = new ListProviderMonthAvailabilityService(
      fakeAppointmentRepository
    )
  })

  it('should to list month availabilty to a provider', async () => {
    const provider = new User()
    provider.id = '123123'

    const user = new User()
    user.id = '123123'

    await fakeAppointmentRepository.create({
      provider_id: provider.id,
      user_id: user.id,
      date: new Date(2020, 11, 2, 16, 0, 0),
    })

    for (let i = 8; i <= 17; i += 1) {
      // eslint-disable-next-line no-await-in-loop
      await fakeAppointmentRepository.create({
        provider_id: provider.id,
        user_id: user.id,
        date: new Date(2020, 11, 1, i, 0, 0),
      })
    }

    const availabilty = await listAvailabilityService.execute({
      provider_id: '123123',
      year: 2020,
      month: 12,
    })

    expect(availabilty).toEqual(
      expect.arrayContaining([
        { day: 1, available: false },
        { day: 2, available: true },
      ])
    )
  })
})
