import { Router } from 'express'
import AuthUserService from '@modules/users/services/AuthUserService'
import UserRepository from '../../typeorm/repositories/UserRepository'
import { container } from 'tsyringe'

const routes = Router()

routes.post('/', async (request, response) => {
  const { email, password } = request.body

  const authService = container.resolve(AuthUserService)

  const { user, token } = await authService.execute({ email, password })

  return response.json({ user, token })
})

export default routes
