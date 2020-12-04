import { parseISO } from 'date-fns'
import { Request, Response } from 'express'
import { container } from 'tsyringe'
import CreateAppointmentService from '@modules/appointments/services/CreateAppointmentService'
import UserRepository from '@modules/users/infra/typeorm/repositories/UserRepository'
import User from '@modules/users/infra/typeorm/entities/User'
import ListProviderAppointmentsService from '@modules/appointments/services/ListProviderAppointmentsService'
import AppointmentRepository from '../../typeorm/repositories/AppointmentRepository'

class ProviderAppointmentsController {
  public async index(request: Request, response: Response): Promise<Response> {
    const { day, month, year } = request.body
    const { user } = request

    const listProviderAppointmentsService = container.resolve(
      ListProviderAppointmentsService
    )

    const appointments = await listProviderAppointmentsService.execute({
      provider_id: user.id,
      day,
      month,
      year,
    })
    return response.json(appointments)
  }

  public async list(request: Request, response: Response): Promise<Response> {
    const appointmentRepository = new AppointmentRepository()
    const user = await new UserRepository().findById(request.user.id)
    return response.json(await appointmentRepository.all(user as User))
  }
}

export default ProviderAppointmentsController
