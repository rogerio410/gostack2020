import path from 'path'
import fs from 'fs'
import User from '@modules/users/infra/typeorm/entities/User'
import uploadConfig from '@config/upload'
import AppError from '@shared/errors/AppError'
import { injectable, inject } from 'tsyringe'
import IStorageProvider from '@shared/container/providers/StorageProvider/models/IStorageProvider'
import IUserRepository from '../repositories/IUserRepository'

interface IRequest {
  user_id: string
  avatar_filename: string
}

@injectable()
class UpdateUserAvatarService {
  constructor(
    @inject('UserRepository') private userRepository: IUserRepository,
    @inject('UserRepository') private storageProvider: IStorageProvider
  ) {
    this.userRepository = userRepository
  }

  public async execute({ user_id, avatar_filename }: IRequest): Promise<User> {
    const user = await this.userRepository.findById(user_id)

    if (!user) {
      throw new AppError('Only authenticated users can change avatar', 401)
    }

    if (user.avatar) {
      // remove old avatar file from filesystem
      await this.storageProvider.deleteFile(user.avatar)
    }

    const filename = await this.storageProvider.saveFile(avatar_filename)

    user.avatar = filename
    this.userRepository.save(user)

    return user
  }
}

export default UpdateUserAvatarService
