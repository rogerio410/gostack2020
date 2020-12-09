import User from '@modules/users/infra/typeorm/entities/User'
import FakeCacheProvider from '@shared/container/providers/CacheProvider/fakes/FakeCacheProvider'
import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider'
import FakeAppointmentRepository from '../repositories/fakes/FakeAppointmentRepository'
import ListProviderAppointmentsService from './ListProviderAppointmentsService'
import ListProviderMonthAvailabilityService from './ListProviderMonthAvailabilityService'

let listProviderAppointmentsService: ListProviderAppointmentsService
let fakeAppointmentRepository: FakeAppointmentRepository
let fakeCacheProvider: ICacheProvider

describe('List Provider Appointments', () => {
  beforeEach(() => {
    fakeAppointmentRepository = new FakeAppointmentRepository()
    fakeCacheProvider = new FakeCacheProvider()

    listProviderAppointmentsService = new ListProviderAppointmentsService(
      fakeAppointmentRepository,
      fakeCacheProvider
    )
  })

  it('should to be able to list appointment for provider at a day', async () => {
    const provider = new User()
    provider.id = '123123'

    const user = new User()
    user.id = '123123'

    const app1 = await fakeAppointmentRepository.create({
      provider_id: provider.id,
      user_id: user.id,
      date: new Date(2020, 11, 2, 16, 0, 0),
    })

    const app2 = await fakeAppointmentRepository.create({
      provider_id: provider.id,
      user_id: user.id,
      date: new Date(2020, 11, 2, 10, 0, 0),
    })

    const appointments = await listProviderAppointmentsService.execute({
      provider_id: provider.id,
      year: 2020,
      month: 12,
      day: 2,
    })

    expect(appointments).toEqual([app1, app2])
  })
})
