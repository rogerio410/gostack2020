import IMailTemplateParseDTO from '../../MailTemplateProvider/dtos/IMailTemplateParseDTO'

interface IContact {
  name: string
  email: string
}
interface ISendMailDTO {
  to: IContact
  from?: IContact
  subject: string
  templateData: IMailTemplateParseDTO
}

export default ISendMailDTO
