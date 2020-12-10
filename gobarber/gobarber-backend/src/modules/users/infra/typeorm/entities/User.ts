import { Column, Entity, Generated, OneToMany } from 'typeorm'
import Appointment from '@modules/appointments/infra/typeorm/entities/Appointment'
import AuditBaseModel from '@shared/entities/AuditBaseModel'
import { Exclude, Expose } from 'class-transformer'
import uploadConfig from '@config/upload'
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
  @Exclude()
  password: string

  @Column({ nullable: true })
  @Exclude()
  avatar: string

  @OneToMany(() => Appointment, appointment => appointment.provider)
  appointments: Appointment[]

  @OneToMany(() => Appointment, appointment => appointment.user)
  my_appointments: Appointment[]

  @OneToMany(() => UserToken, userToken => userToken.user)
  userTokens: UserToken[]

  @Expose({ name: 'avatar_url' })
  getAvatarUrl(): string | null {
    if (!this.avatar) {
      return null
    }

    switch (uploadConfig.driver) {
      case 'disk':
        return `${process.env.APP_API_URL}/files/${this.avatar}`
      case 's3':
        return `https://${uploadConfig.config.aws.bucket}.s3.amazonaws.com/${this.avatar}`
      default:
        return null
    }
  }
}

export default User
