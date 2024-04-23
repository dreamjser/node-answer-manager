import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CacheModule } from '@nestjs/cache-manager';
import { APP_GUARD } from '@nestjs/core';
import { AppService } from './app.service';
import { AuthGuard } from './common/auth.guard';
import { TokenService } from './common/token.service';
import { UserModule } from './user/user.module';
import { User } from './user/user.entity';
import { QuestionGroupModule } from './question_group/question_group.module';
import { QuestionGroup } from './question_group/question_group.entity';
import { QuestionModule } from './question/question.module';
import { Question } from './question/question.entity';
import { TagModule } from './tag/tag.module';
import { Tag } from './tag/tag.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: '192.168.194.50',
      port: 3306,
      username: 'root',
      password: 'sun.012790',
      database: 'answer',
      entities: [User, QuestionGroup, Question, Tag],
      synchronize: true,
    }),
    CacheModule.register({
      ttl: 3600 * 1000,
      isGlobal: true,
    }),
    UserModule,
    QuestionGroupModule,
    QuestionModule,
    TagModule,
  ],
  controllers: [],
  providers: [
    AppService,
    TokenService,
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
  ],
})
export class AppModule {}
