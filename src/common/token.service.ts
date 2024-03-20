import { Injectable, Inject } from '@nestjs/common';
import { Cache } from 'cache-manager'
import { CACHE_MANAGER } from '@nestjs/cache-manager'

@Injectable()
export class TokenService {
  constructor(
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) { }

  async checkToken(token: string): Promise<boolean> {
    const res = await this.cacheManager.get(token)
    return !!res
  }
}
