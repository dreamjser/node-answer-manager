import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TagController } from './tag.controller';
import { TagService } from './tag.service';
import { Tag, TagQuestionReleation } from './tag.entity'

@Module({
  imports: [
    TypeOrmModule.forFeature([Tag, TagQuestionReleation]),
  ],
  controllers: [TagController],
  providers: [TagService],
})
export class TagModule {}
