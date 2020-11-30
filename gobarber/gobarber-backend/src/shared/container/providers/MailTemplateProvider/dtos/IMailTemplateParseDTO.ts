interface ITemplateVariables {
  [key: string]: string | number
}

interface IMailTemplateParseDTO {
  file: string
  variables: ITemplateVariables
}

export default IMailTemplateParseDTO
