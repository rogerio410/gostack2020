import { isEqual } from 'date-fns'
import { roundToNearestMinutesWithOptions } from 'date-fns/fp'
import Appointment from '../models/Appointment'


class AppointmentRepository {
    private appointments: Appointment[]

    constructor() {
        this.appointments = []
    }

    public create(provider: string, date: Date): Appointment {

        const appointment = new Appointment(provider, date)
        this.appointments.push(appointment)

        return appointment
    }

    public findByDate(date: Date): Appointment | null {
        const appointment = this.appointments.find(appointment => {
            return isEqual(date, appointment.date)
        })

        return appointment || null
    }

    public all(): Array<Appointment> {
        return this.appointments
    }


}

export default AppointmentRepository