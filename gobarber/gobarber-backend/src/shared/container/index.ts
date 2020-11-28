import { container } from 'tsyringe'
import '@modules/users/providers'
import './providers'

import IAppointmentRepository from '@modules/appointments/repositories/IAppointmentRepository'
import AppointmentRepository from '@modules/appointments/infra/typeorm/repositories/AppointmentRepository'

import IUserRepository from '@modules/users/repositories/IUserRepository'
import UserRepository from '@modules/users/infra/typeorm/repositories/UserRepository'
import UserTokenRepository from '@modules/users/infra/typeorm/repositories/UserTokenRepository'
import IUserTokenRepository from '@modules/users/repositories/IUserTokenRepository'

container.registerSingleton<IAppointmentRepository>(
  'AppointmentRepository',
  AppointmentRepository
)

container.registerSingleton<IUserRepository>('UserRepository', UserRepository)

container.registerSingleton<IUserTokenRepository>(
  'UserTokenRepository',
  UserTokenRepository
)
