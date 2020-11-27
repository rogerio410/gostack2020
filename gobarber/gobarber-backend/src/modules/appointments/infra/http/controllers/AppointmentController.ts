import { parseISO } from 'date-fns'
import { Request, Response } from 'express'
import { container } from 'tsyringe'
import CreateAppointmentService from '@modules/appointments/services/CreateAppointmentService'
import UserRepository from '@modules/users/infra/typeorm/repositories/UserRepository'
import User from '@modules/users/infra/typeorm/entities/User'
import { getRepository } from 'typeorm'
import AppError from '@shared/errors/AppError'
import AppointmentRepository from '../../typeorm/repositories/AppointmentRepository'

class AppointmentController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { provider_id, date } = request.body

    const parsedDate = parseISO(date)

    // TODO: Solve this (Get User) maybe routes must send the user
    const provider = await getRepository(User).findOne({
      id: provider_id,
    })

    if (!provider) {
      throw new AppError('Provider not found')
    }

    const createAppointmentService = container.resolve(CreateAppointmentService)

    const appointment = await createAppointmentService.execute({
      provider,
      date: parsedDate,
    })
    return response.json(appointment)
  }

  public async list(request: Request, response: Response): Promise<Response> {
    const appointmentRepository = new AppointmentRepository()
    const user = await new UserRepository().findById(request.user.id)
    return response.json(await appointmentRepository.all(user as User))
  }
}

export default AppointmentController
