import { Controller, Inject, Post, Get, Put, Body, Query } from '@nestjs/common';
import { TagService } from './tag.service';
import { Result } from 'src/common/result.interface';
import { responseData } from '../common/utils/response_data'
import { Like } from 'typeorm';

@Controller('tag')
export class TagController {
  constructor(
    @Inject(TagService) private readonly tagService: TagService,
) { }

  @Get('getTagList')
  async getTagList(@Query() query): Promise<Result> {
    const queryData = query.name? {
      tag_name: Like('%' + query.name.trim() + '%')
    }: {}
    const data = await this.tagService.findTagAll(queryData)

    return responseData('0', null, data)
  }

  @Post('addTag')
  async addTag(@Body() body): Promise<Result>{
    const hasData = await this.tagService.findTag({
      tag_name: body.name
    })

    if(hasData) {
      return responseData('MT401', '标签已存在')
    }

    const data = await this.tagService.addTag(body.name);

    if(data) {
      return responseData('0')
    }else{
      return responseData('MT402', '新增标签失败')
    }
  }

  @Put('updateTag')
  async updateTag(@Body() body): Promise<Result>{
    const hasData = await this.tagService.findTag({
      id: body.id
    })
    if(hasData) {
      await this.tagService.updateTag(body.id, {
        tag_name: body.name,
      })
    }

    return responseData('0')
  }

  @Put('deleteTag')
  async deleteTag(@Body() body): Promise<Result>{
    const hasData = await this.tagService.findTag({
      id: body.id
    })

    if(hasData) {
      await this.tagService.deleteTag(body.id)
    }

    return responseData('0', '删除成功')
  }
}
