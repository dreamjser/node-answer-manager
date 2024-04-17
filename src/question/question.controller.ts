import {
  Controller,
  Inject,
  Post,
  Get,
  Put,
  Body,
  Query,
} from '@nestjs/common';
import { QuestionService } from './question.service';
import { TagQuestionReleationService } from '../tag/tag.service';
import { Result } from 'src/common/result.interface';
import { responseData } from '../common/utils/response_data';
import { Like } from 'typeorm';
@Controller('question')
export class QuestionController {
  constructor(
    @Inject(QuestionService)
    private readonly questionService: QuestionService,
    @Inject(TagQuestionReleationService)
    private readonly tagQuestionReleationService: TagQuestionReleationService,
  ) {}

  private transforAnswers(answers: Array<any>) {
    const answer_options = answers.map((answer: any) => answer.answerName);
    const answer_right = answers.map((answer: any) => {
      return answer.isRight ? 1 : 0;
    });
    return {
      answer_options: answer_options.join('|'),
      answer_right: answer_right.join('|'),
    };
  }

  @Get('getQuestionList')
  async getQuestionList(@Query() query): Promise<Result> {
    const current = query.current || 1;
    const take = query.pageSize || 10;
    const skip = (current - 1) * take;
    const queryData = query.name
      ? {
          question_name: Like('%' + query.name.trim() + '%'),
        }
      : {};
    const data = await this.questionService.findQuestionAll(
      queryData,
      take,
      skip,
    );

    return responseData('0', null, data);
  }

  @Post('addQuestion')
  async addQuestion(@Body() body): Promise<Result> {
    const hasData = await this.questionService.findQuestion({
      question_name: body.name,
    });
    const answerData = this.transforAnswers(body.answers || []);

    if (hasData) {
      return responseData('MT301', '题目已存在');
    }
    // 新增题目
    const data = await this.questionService.addQuestion(
      body.name,
      body.type,
      answerData.answer_options,
      answerData.answer_right,
    );
    const relations = body.tag.map((tag) => ({
      question_id: data.raw.insertId,
      tag_id: tag,
    }));
    // 新增题目标签关系
    await this.tagQuestionReleationService.addTagQuestionReleation(relations);

    if (data) {
      return responseData('0');
    } else {
      return responseData('MT302', '新增题目失败');
    }
  }

  @Put('updateQuestion')
  async updateQuestion(@Body() body): Promise<Result> {
    const hasData = await this.questionService.findQuestion({
      question_id: body.id,
    });
    if (hasData) {
      await this.questionService.updateQuestion(body.id, {
        question_name: body.name,
        question_type: body.type,
      });
    }

    return responseData('0');
  }

  @Put('deleteQuestion')
  async deleteQuestion(@Body() body): Promise<Result> {
    const hasData = await this.questionService.findQuestion({
      question_id: body.id,
    });

    if (hasData) {
      await this.questionService.deleteQuestion(body.id);
    }

    return responseData('0', '删除成功');
  }
}
