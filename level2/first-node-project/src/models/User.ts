import { Column, Entity, Generated, OneToMany } from 'typeorm'
import Appointment from './Appointment'
import AuditBaseModel from './AuditBaseModel'

@Entity()
class User extends AuditBaseModel {
    @Column({
        primary: true,
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

    @OneToMany(
        () => Appointment,
        appointment => appointment.provider,
    )
    appointments: Appointment[]
}

export default User