import { Column, Entity, Generated, OneToMany } from 'typeorm'
import Appointment from '@modules/appointments/infra/typeorm/entities/Appointment'
import AuditBaseModel from '@shared/entities/AuditBaseModel'
import UserToken from './UserToken'

@Entity()
class User extends AuditBaseModel {
  @Column({
    primary: true,
    type: 'uuid',
  })
  @Generated('uuid')
  id: string

  @Column()
  name: string

  @Column()
  email: string

  @Column()
  password: string

  @Column({ nullable: true })
  avatar: string

  @OneToMany(() => Appointment, appointment => appointment.provider)
  appointments: Appointment[]

  @OneToMany(() => Appointment, appointment => appointment.user)
  my_appointments: Appointment[]

  @OneToMany(() => UserToken, userToken => userToken.user)
  userTokens: UserToken[]
}

export default User
