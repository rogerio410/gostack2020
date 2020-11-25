import { Column, Entity, Generated, OneToMany } from 'typeorm'
import Appointment from '@modules/appointments/infra/typeorm/entities/Appointment'
import AuditBaseModel from '@shared/entities/AuditBaseModel'

@Entity()
class User extends AuditBaseModel {
    @Column({
        primary: true,
        type: 'uuid'
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