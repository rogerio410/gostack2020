import { getRepository } from "typeorm";
import User from "../models/User";
import User from '../models/User'

interface Request {
    name: string
    email: string
    password: string
}

class CreateUserService {

    public async execute(requestData: Request): Promise<User> {

        const usersRepository = getRepository(User)

        const checkDuplicateEmail = await usersRepository.findOne({
            where: { email: requestData.email }
        })

        if (checkDuplicateEmail) {
            throw Error('Emails Alredy exists a user with a user')
        }

        const user = usersRepository.create(requestData)

        await usersRepository.save(user)

        return user
    }

}

export default CreateUserService