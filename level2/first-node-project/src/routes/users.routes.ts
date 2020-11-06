import { Router } from 'express'
import ensureAuthenticated from '../middleware/ensureAuthenticated'
import CreateUserService from '../services/CreateUserService'
import multer from 'multer'
import uploadConfig from '../config/upload'
import UpdateUserAvatarService from '../services/UpdateUserAvatarService'

const routes = Router()

const upload = multer(uploadConfig)


routes.post('/', async (request, response) => {
    const { name, email, password } = request.body

    const createUser = new CreateUserService()
    const user = await createUser.execute({ name, email, password })

    return response.json(user)
})

routes.patch('/avatar', ensureAuthenticated, upload.single('avatar'), async (request, response) => {

    const updateAvatarService = new UpdateUserAvatarService()

    const user = await updateAvatarService.execute(
        {
            user_id: request.user.id,
            avatar_filename: request.file.filename
        })

    return response.json(user)

})

export default routes