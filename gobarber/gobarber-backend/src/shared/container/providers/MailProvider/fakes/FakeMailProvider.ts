import IMailProvider from '../models/IMailProvider'

interface Message {
  to: string
  body: string
  date: Date
}

class FakeMailProvider implements IMailProvider {
  private messages: Message[] = []

  public async sendMail(to: string, body: string): Promise<void> {
    this.messages.push({
      to,
      body,
      date: new Date(),
    })
  }
}

export default FakeMailProvider
