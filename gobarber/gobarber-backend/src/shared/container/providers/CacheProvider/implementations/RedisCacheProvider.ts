import Redis, { Redis as RedisClient } from 'ioredis'
import cacheConfig from '@config/cache'
import ICacheProvider from '../models/ICacheProvider'

class RedisCacheProvider implements ICacheProvider {
  private redis: RedisClient

  constructor() {
    this.redis = new Redis(cacheConfig.config.redis)
  }

  public async save(key: string, value: any): Promise<void> {
    this.redis.set(key, JSON.stringify(value))
  }

  public async recovery<T>(key: string): Promise<T | null> {
    const data = await this.redis.get(key)
    if (!data) {
      return null
    }
    const parsedData = JSON.parse(data) as T
    return parsedData
  }

  public async invalidade(key: string): Promise<void> {
    await this.redis.del(key)
  }

  public async invalidadePrefix(prefix: string): Promise<void> {
    const keys = await this.redis.keys(`${prefix}:*`)
    const pipeline = this.redis.pipeline()
    keys.forEach(key => {
      pipeline.del(key)
    })

    await pipeline.exec()
  }
}

export default RedisCacheProvider
