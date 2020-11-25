import { parseISO } from 'date-fns'
import { Request, Response } from 'express'
import { container } from 'tsyringe'
import CreateAppointmentService from '@modules/appointments/services/CreateAppointmentService'
import AppointmentRepository from '../../typeorm/repositories/AppointmentRepository'

class AppointmentController {

  public async create(request: Request, response: Response): Promise<Response> {
    const { provider_id, date } = request.body

    const parsedDate = parseISO(date)

    const createAppointmentService = container.resolve(CreateAppointmentService)

    const appointment = await createAppointmentService.execute({
      provider_id, date: parsedDate
    })
    return response.json(appointment)
  }

  public async list(request: Request, response: Response): Promise<Response> {
    const appointmentRepository = new AppointmentRepository()
    return response.json(await appointmentRepository.all())
  }

}

export default AppointmentController
