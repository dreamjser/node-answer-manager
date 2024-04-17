import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { QuestionController } from './question.controller';
import { QuestionService } from './question.service';
import { TagQuestionReleationService } from '../tag/tag.service';
import { Question } from './question.entity';
import { TagQuestionReleation } from '../tag/tag.entity';
@Module({
  imports: [TypeOrmModule.forFeature([Question, TagQuestionReleation])],
  controllers: [QuestionController],
  providers: [QuestionService, TagQuestionReleationService],
})
export class QuestionModule {}
