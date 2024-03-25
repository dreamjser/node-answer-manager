import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CacheModule } from '@nestjs/cache-manager';
import { APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core';
import { AppService } from './app.service';
import { UserModule } from './user/user.module'
import { User } from './user/user.entity';
import { AuthGuard } from './common/auth.guard';
import { TokenService } from './common/token.service';
import { AuthInterceptor } from './common/auth.interceptor';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: '192.168.194.50',
      port: 3306,
      username: 'root',
      password: 'sun.012790',
      database: 'answer',
      entities: [User],
      synchronize: true,
    }),
    CacheModule.register({
      ttl: 3600* 1000,
      isGlobal: true,
    }),
    UserModule,
  ],
  controllers: [],
  providers: [
    AppService,
    TokenService,
    // {
    //   provide: APP_GUARD,
    //   useClass: AuthGuard,
    // },
    {
      provide: APP_INTERCEPTOR,
      useClass: AuthInterceptor,
    }
  ],
})
export class AppModule {}
