import { container } from 'tsyringe'
import EtherealMailProvider from './MailProvider/implementations/EtherealMailProvider'
import IMailProvider from './MailProvider/models/IMailProvider'
import HandlebarsTemplateProvider from './MailTemplateProvider/implementations/HandlebarsTemplateProvider'
import IMailTemplateProvider from './MailTemplateProvider/models/IMailTemplateProvider'
import DiskStorageProvider from './StorageProvider/implementations/DiskStorageProvider'
import IStorageProvider from './StorageProvider/models/IStorageProvider'

container.registerSingleton<IStorageProvider>(
  'StorageProvider',
  DiskStorageProvider
)

container.registerSingleton<IMailTemplateProvider>(
  'MailTemplateProvider',
  HandlebarsTemplateProvider
)

// container.registerSingleton<IMailProvider>('MailProvider', EtherealMailProvider)
container.registerInstance<IMailProvider>(
  'MailProvider',
  container.resolve(EtherealMailProvider)
)
