import ListProviderMonthAvailabilityService from '@modules/appointments/services/ListProviderMonthAvailabilityService'
import { Request, Response } from 'express'
import { container } from 'tsyringe'

class ProviderMonthAvailabilityController {
  public async index(request: Request, response: Response): Promise<Response> {
    const { month, year } = request.query
    const { provider_id } = request.params

    const availabilityService = container.resolve(
      ListProviderMonthAvailabilityService
    )

    const availability = await availabilityService.execute({
      provider_id,
      month: Number(month),
      year: Number(year),
    })

    return response.json(availability)
  }
}

export default ProviderMonthAvailabilityController
