import { getRepository } from "typeorm"
import User from "../models/User"
import { compare } from 'bcryptjs'
import { sign } from 'jsonwebtoken'
import authConfig from '../config/auth'

interface Request {
    email: string,
    password: string
}

class AuthUserService {
    public async execute({ email, password }: Request): Promise<{ user: User, token: string }> {
        const usersRepository = getRepository(User)
        const user = await usersRepository.findOne({
            where: { email }
        })

        if (!user) {
            throw Error('Incorrect email/password!')
        }

        const passwordMatched = await compare(password, user.password)

        if (!passwordMatched) {
            throw Error('Incorrect email/password!')
        }

        const { secret, expiresIn } = authConfig.jwt

        const token = sign({}, secret, {
            subject: user.id,
            expiresIn,
        })
        return { user, token }

    }
}

export default AuthUserService