import ISendMailDTO from '../dtos/ISendEmailDTO'

interface IMailProvider {
  sendMail(data: ISendMailDTO): Promise<void>
}

export default IMailProvider
