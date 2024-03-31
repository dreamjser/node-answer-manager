import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { QuestionGroupController } from './question_group.controller';
import { QuestionGroupService } from './question_group.service';
import { QuestionGroup } from './question_group.entity'

@Module({
  imports: [
    TypeOrmModule.forFeature([QuestionGroup]),
  ],
  controllers: [QuestionGroupController],
  providers: [QuestionGroupService],
})
export class QuestionGroupModule {}
