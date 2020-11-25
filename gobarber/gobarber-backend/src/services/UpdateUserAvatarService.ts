import { getRepository, UpdateDateColumn } from "typeorm";
import User from "../models/User";
import path from 'path'
import uploadConfig from '../config/upload'
import fs from 'fs'
import AppError from "../errors/AppError";

interface Request {
    user_id: string
    avatar_filename: string
}
class UpdateUserAvatarService {

    public async execute({ user_id, avatar_filename }: Request): Promise<User> {
        const usersRepository = getRepository(User)

        const user = await usersRepository.findOne(user_id)

        if (!user) {
            throw new AppError("Only authenticated users can change avatar", 401);
        }

        if (user.avatar) {
            // remove old avatar file from filesystem
            const userAvatarFilePath = path.join(uploadConfig.directory, user.avatar)
            const userAvatarFileExists = await fs.promises.stat(userAvatarFilePath)

            if (userAvatarFileExists) {
                await fs.promises.unlink(userAvatarFilePath)
            }
        }

        user.avatar = avatar_filename
        usersRepository.save(user)

        return user
    }
}

export default UpdateUserAvatarService