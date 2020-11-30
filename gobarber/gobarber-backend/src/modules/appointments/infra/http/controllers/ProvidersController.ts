import ListProviderService from '@modules/appointments/services/ListProvidersService'
import { Request, Response } from 'express'
import { container } from 'tsyringe'

class ProvidersController {
  public async index(request: Request, response: Response): Promise<Response> {
    const loggedUser = request.user

    const listProviderService = container.resolve(ListProviderService)
    const providers = await listProviderService.execute({
      user_id: loggedUser.id,
    })

    return response.json(providers)
  }
}

export default ProvidersController
