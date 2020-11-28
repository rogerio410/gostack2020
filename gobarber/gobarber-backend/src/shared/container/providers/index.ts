import { container } from 'tsyringe'
import FakeMailProvider from './MailProvider/fakes/FakeMailProvider'
import IMailProvider from './MailProvider/models/IMailProvider'
import DiskStorageProvider from './StorageProvider/implementations/DiskStorageProvider'
import IStorageProvider from './StorageProvider/models/IStorageProvider'

container.registerSingleton<IStorageProvider>(
  'StorageProvider',
  DiskStorageProvider
)

container.registerSingleton<IMailProvider>('MailProvider', FakeMailProvider)
