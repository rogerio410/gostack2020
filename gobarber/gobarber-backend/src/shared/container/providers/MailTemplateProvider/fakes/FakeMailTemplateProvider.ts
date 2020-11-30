import IMailTemplateParseDTO from '../dtos/IMailTemplateParseDTO'
import IMailTemplateProvider from '../models/IMailTemplateProvider'

class FakeMailTemplateProvider implements IMailTemplateProvider {
  public async parse(): Promise<string> {
    return 'ok'
  }
}

export default FakeMailTemplateProvider
