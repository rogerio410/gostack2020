import { Column, Entity, Generated, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm'
import AuditBaseModel from '@shared/entities/AuditBaseModel'
import User from '@modules/users/infra/typeorm/entities/User'

@Entity()
class Appointment extends AuditBaseModel {
  @Column({
    primary: true,
    type: 'uuid'
  })
  @Generated('uuid')
  id: string

  @ManyToOne(() => User, user => user.appointments,
    { onDelete: 'SET NULL', onUpdate: 'CASCADE' }
  )
  provider: User

  @Column({ type: 'timestamp with time zone' })
  date: Date
}

export default Appointment
