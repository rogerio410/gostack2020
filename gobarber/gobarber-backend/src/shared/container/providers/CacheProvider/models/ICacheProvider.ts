interface ICacheProvider {
  save(key: string, value: any): Promise<void>
  recovery<T>(key: string): Promise<T | null>
  invalidade(key: string): Promise<void>
  invalidadePrefix(prefix: string): Promise<void>
}

export default ICacheProvider
