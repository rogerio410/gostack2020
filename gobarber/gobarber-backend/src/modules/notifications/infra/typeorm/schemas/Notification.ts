import AuditBaseModel from '@shared/entities/AuditBaseModel'
import { Column, Entity, ObjectID, ObjectIdColumn } from 'typeorm'

@Entity('notifications')
class Notification extends AuditBaseModel {
  @ObjectIdColumn()
  id: ObjectID

  @Column()
  content: string

  @Column('uuid')
  recipient_id: string

  @Column({ default: false })
  read: boolean
}

export default Notification
