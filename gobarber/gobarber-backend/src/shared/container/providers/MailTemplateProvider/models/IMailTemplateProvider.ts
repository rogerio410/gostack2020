import IMailTemplateParseDTO from '../dtos/IMailTemplateParseDTO'

interface IMailTemplateProvider {
  parse(data: IMailTemplateParseDTO): Promise<string>
}

export default IMailTemplateProvider
