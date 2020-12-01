import ListProviderDayAvailabilityService from '@modules/appointments/services/ListProviderDayAvailabilityService'
import { Request, Response } from 'express'
import { container } from 'tsyringe'

class ProviderDayAvailabilityController {
  public async index(request: Request, response: Response): Promise<Response> {
    const { month, year, day } = request.body
    const { provider_id } = request.params

    const availabilityService = container.resolve(
      ListProviderDayAvailabilityService
    )

    const availability = await availabilityService.execute({
      provider_id,
      month,
      year,
      day,
    })

    return response.json(availability)
  }
}

export default ProviderDayAvailabilityController
