import { Column, Entity, Generated, ManyToOne, OneToMany } from 'typeorm'
import AuditBaseModel from '@shared/entities/AuditBaseModel'
import User from './User'

/**
 * UserToken is for recovery forgotten password
 */
@Entity()
class UserToken extends AuditBaseModel {
  @Column({
    primary: true,
    type: 'uuid',
  })
  @Generated('uuid')
  id: string

  @Column()
  @Generated('uuid')
  token: string

  @ManyToOne(() => User, user => user.userTokens, {
    onDelete: 'SET NULL',
    onUpdate: 'CASCADE',
    // lazy: true, # returns a promises on get value
    eager: true,
  })
  user: User
}

export default UserToken
