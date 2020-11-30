import fs from 'fs'
import handlebars from 'handlebars'
import IMailTemplateParseDTO from '../dtos/IMailTemplateParseDTO'
import IMailTemplateProvider from '../models/IMailTemplateProvider'

class HandlebarsTemplateProvider implements IMailTemplateProvider {
  public async parse({
    file,
    variables,
  }: IMailTemplateParseDTO): Promise<string> {
    const templateFileContent = await fs.promises.readFile(file, {
      encoding: 'utf-8',
    })

    const parseTemplate = handlebars.compile(templateFileContent)
    return parseTemplate(variables)
  }
}

export default HandlebarsTemplateProvider
