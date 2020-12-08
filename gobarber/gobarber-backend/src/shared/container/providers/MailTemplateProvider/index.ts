import { container } from 'tsyringe'
import HandlebarsTemplateProvider from './implementations/HandlebarsTemplateProvider'
import IMailTemplateProvider from './models/IMailTemplateProvider'

const providers = {
  handlebars: HandlebarsTemplateProvider,
}

container.registerSingleton<IMailTemplateProvider>(
  'MailTemplateProvider',
  providers.handlebars
)
