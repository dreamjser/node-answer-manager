import { Controller, Inject, Post, Get, Put, Body, Query } from '@nestjs/common';
import { QuestionService } from './question.service';
import { Result } from 'src/common/result.interface';
import { responseData } from '../common/utils/response_data'
import { Like } from 'typeorm';
@Controller('question')
export class QuestionController {
  constructor(
    @Inject(QuestionService) private readonly questionService: QuestionService,
) { }

  @Get('getQuestionList')
  async getQuestionList(@Query() query): Promise<Result> {
    const current = query.current || 1
    const take = query.pageSize || 10
    const skip = (current - 1) * take
    const queryData = query.name? {
      question_name: Like('%' + query.name.trim() + '%')
    }: {}
    const data = await this.questionService.findQuestionAll(queryData, take, skip)

    return responseData('0', null, data)
  }

  @Post('addQuestion')
  async addQuestion(@Body() body): Promise<Result>{
    const hasData = await this.questionService.findQuestion({
      question_name: body.name
    })
    if(hasData) {
      return responseData('MT301', '题库已存在')
    }

    const data = await this.questionService.addQuestion(body.name, body.desc);

    if(data) {
      return responseData('0')
    }else{
      return responseData('MT302', '新增题库失败')
    }
  }

  @Put('updateQuestion')
  async updateQuestion(@Body() body): Promise<Result>{
    const hasData = await this.questionService.findQuestion({
      _id: body.id
    })
    if(hasData) {
      await this.questionService.updateQuestion(body.id, {
        _name: body.name,
        _desc: body.desc
      })
    }

    return responseData('0')
  }

  @Put('deleteQuestion')
  async deleteQuestion(@Body() body): Promise<Result>{
    const hasData = await this.questionService.findQuestion({
      question_id: body.id
    })

    if(hasData) {
      await this.questionService.deleteQuestion(body.id)
    }

    return responseData('0', '删除成功')
  }
}
