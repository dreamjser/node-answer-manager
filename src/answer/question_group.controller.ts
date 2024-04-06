import { Controller, Inject, Post, Get, Put, Body, Query } from '@nestjs/common';
import { QuestionGroupService } from './question_group.service';
import { Result } from 'src/common/result.interface';
import { responseData } from '../common/utils/response_data'
import { Like } from 'typeorm';
@Controller('questionGroup')
export class QuestionGroupController {
  constructor(
    @Inject(QuestionGroupService) private readonly questionGroupService: QuestionGroupService,
) { }

  @Get('getQuestionGroupList')
  async getQuestionGroupList(@Query() query): Promise<Result> {
    const current = query.current || 1
    const take = query.pageSize || 10
    const skip = (current - 1) * take
    const queryData = query.name? {
      group_name: Like('%' + query.name.trim() + '%')
    }: {}
    const data = await this.questionGroupService.findQuestionGroupAll(queryData, take, skip)

    return responseData('0', null, data)
  }

  @Post('addQuestionGroup')
  async addQuestionGroup(@Body() body): Promise<Result>{
    const hasData = await this.questionGroupService.findQuestionGroup({
      group_name: body.name
    })
    if(hasData) {
      return responseData('MT301', '题库已存在')
    }

    const data = await this.questionGroupService.addQuestionGroup(body.name, body.desc);

    if(data) {
      return responseData('0')
    }else{
      return responseData('MT302', '新增题库失败')
    }
  }

  @Put('updateQuestionGroup')
  async updateQuestionGroup(@Body() body): Promise<Result>{
    const hasData = await this.questionGroupService.findQuestionGroup({
      group_id: body.id
    })
    if(hasData) {
      await this.questionGroupService.updateQuestionGroup(body.id, {
        group_name: body.name,
        group_desc: body.desc
      })
    }

    return responseData('0')
  }

  @Put('deleteQuestionGroup')
  async deleteQuestionGroup(@Body() body): Promise<Result>{
    const hasData = await this.questionGroupService.findQuestionGroup({
      group_id: body.id
    })

    if(hasData) {
      await this.questionGroupService.deleteQuestionGroup(body.id)
    }

    return responseData('0', '删除成功')
  }
}
