import { getRepository } from "typeorm";
import { hash } from 'bcryptjs'
import User from "@modules/users/infra/typeorm/entities/User";
import AppError from "@shared/errors/AppError";

interface Request {
    name: string
    email: string
    password: string
}

class CreateUserService {

    public async execute({ name, email, password }: Request): Promise<User> {

        const usersRepository = getRepository(User)

        const checkDuplicateEmail = await usersRepository.findOne({
            where: { email }
        })

        if (checkDuplicateEmail) {
            throw new AppError('Emails Alredy exists a user with a user')
        }

        const hashedPassword = await hash(password, 8)
        const user = usersRepository.create({ name, email, password: hashedPassword })

        await usersRepository.save(user)

        return user
    }

}

export default CreateUserService