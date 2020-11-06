import { Column, Entity, Generated, PrimaryColumn } from 'typeorm'

@Entity()
class Appointment {
    @Column({
        primary: true,
        type: 'varchar'
    })
    @Generated('uuid')
    id: string

    @Column({ type: 'varchar', nullable: false })
    provider: string

    @Column({ type: 'timestamp with time zone' })
    date: Date
}

export default Appointment