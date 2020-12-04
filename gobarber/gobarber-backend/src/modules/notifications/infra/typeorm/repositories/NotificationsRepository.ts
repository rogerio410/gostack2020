import ICreateNotificationDTO from '@modules/notifications/dtos/ICreateNotificationDTO'
import INotificationsRepository from '@modules/notifications/repositories/INotificationsRepository'
import { getMongoRepository, MongoRepository } from 'typeorm'
import Notification from '../schemas/Notification'

class NotificationRepository implements INotificationsRepository {
  private repository: MongoRepository<Notification>

  constructor() {
    this.repository = getMongoRepository(Notification, 'mongo')
  }

  public async create({
    recipient_id,
    content,
  }: ICreateNotificationDTO): Promise<Notification> {
    const notification = this.repository.create({
      recipient_id,
      content,
    })

    await this.repository.save(notification)

    return notification
  }
}

export default NotificationRepository
