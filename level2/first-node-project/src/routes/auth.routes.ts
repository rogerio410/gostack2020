import { Router } from 'express'
import AuthUserService from '../services/AuthUserService'

const routes = Router()

routes.post('/', async (request, response) => {

    try {
        const { email, password } = request.body

        const authService = new AuthUserService()

        const { user, token } = await authService.execute({ email, password })

        return response.json({ user, token })
    } catch (error) {
        return response.status(400).json({ message: error.message })
    }

})

export default routes