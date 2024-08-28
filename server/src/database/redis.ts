import { RedisClientType, createClient } from 'redis';
import { REDIS_URL } from '../utils/env';
class Redis {
  private readonly client: RedisClientType;
  constructor() {
    this.client = createClient({
      url: REDIS_URL
    });

    this.client.on('error', (err) => {
      console.log('Redis Client Error', err);
      throw new Error(err);
    });

    this.client
      .connect()
      .then(() => {
        console.log('Successfuly connected to redis');
      })
      .catch((error) => {
        throw new Error(error);
      });
  }

  async set(key: string, value: string | number, duration: number) {
    await this.client.set(key, value, {
      EX: duration
    });
  }

  async get(key: string) {
    const value = await this.client.get(key);
    return value;
  }

  async delete(key: string) {
    await this.client.del(key);
  }
}

export const redis = new Redis();
